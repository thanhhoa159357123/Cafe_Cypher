<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\Size;
use App\Models\Topping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Lấy toàn bộ thông tin đơn hàng của user hiện tại, kèm theo dữ liệu eager_load (Product, Size) để tính toán hiển thị.
     */
    public function getOrder(Request $request)
    {
        $userId = $request->user()->id;

        $order = Order::with(['items'])
            ->where('user_id', $userId)
            ->get();

        return response()->json($order);
    }

    /**
     * Tạo đơn hàng mới từ giỏ hàng của user hoặc user mua ngay mà không cần giỏ hàng.
     * Cần validate dữ liệu đầu vào, tính toán tổng tiền, lưu vào DB,
     * rồi trả về thông tin đơn hàng vừa tạo để FE hiển thị.
     * Lưu ý: Cần xử lý transaction để đảm bảo tính toàn vẹn dữ liệu khi tạo đơn hàng và giảm số lượng tồn kho sản phẩm.
     * Ngoài ra, cần có cơ chế xử lý lỗi khi tạo đơn hàng thất bại (ví dụ: sản phẩm hết hàng, lỗi database, v.v.) để trả về thông báo lỗi phù hợp cho FE.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createOrder(Request $request)
    {
        DB::beginTransaction();
        try {
            $userId = $request->user()->id;

            Log::info("=== TẠO ĐƠN HÀNG MỚI ===");
            Log::info("User ID: " . $userId);

            $validated = $request->validate([
                'checkout_type' => 'required|string|in:cart,buy_now',
                'payment_method' => 'required|string|in:cash,qr_code',
                'shipping_address' => 'required|string|max:255',
                'shipping_phone' => 'required|string|max:20',
                'note' => 'nullable|string|max:500',
            ]);

            Log::info("Dữ liệu đã validate: " . json_encode($validated));

            $order = Order::create([
                'order_number' => 'ORD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4)),
                'user_id' => $userId,
                'total_price' => 0, // Sẽ cập nhật lại sau khi tính toán
                'status' => 'pending',
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'unpaid',
                'shipping_address' => $validated['shipping_address'],
                'shipping_phone' => $validated['shipping_phone'],
                'note' => $validated['note'] ?? null,
            ]);

            Log::info("Đơn hàng đã được tạo: " . json_encode($order));

            $totalPrice = 0;
            $orderItemsData = [];

            // ==== PHÂN LOẠI CÁCH MUA ====

            if ($request->checkout_type === 'cart') {
                $cartItems = CartItem::with(['product', 'size'])->where('user_id', $userId)->get();

                if ($cartItems->isEmpty()) {
                    DB::rollBack();
                    return response()->json(['message' => 'Giỏ hàng trống!'], 400);
                }

                foreach ($cartItems as $cartItem) {
                    // Xử lý an toàn mảng Topping ID (vì DB lưu mảng json hoặc null)
                    $tIds = is_string($cartItem->topping_ids) ? json_decode($cartItem->topping_ids, true) : $cartItem->topping_ids;
                    $tIds = $tIds ?: [];

                    // SỬA LỖI 1: Truyền ID cẩn thận vào hàm
                    $unitPrice = $this->calculateUnitPrice($cartItem->product_id, $cartItem->size_id, $tIds);
                    $lineTotalPrice = $unitPrice * $cartItem->quantity;
                    $totalPrice += $lineTotalPrice;

                    // Lấy TÊN topping để lưu Snapshot
                    $toppingNames = !empty($tIds) ? Topping::whereIn('id', $tIds)->pluck('name')->toArray() : [];

                    // SỬA LỖI 2: Đẩy dữ liệu theo đúng chuẩn Snapshot Table
                    $orderItemsData[] = [
                        'order_id' => $order->id,
                        'product_id' => $cartItem->product_id,
                        'product_name' => $cartItem->product ? $cartItem->product->name : 'SP Đã xóa',
                        'size_name' => $cartItem->size ? $cartItem->size->name : 'Mặc định',
                        'toppings' => json_encode($toppingNames, JSON_UNESCAPED_UNICODE),
                        'quantity' => $cartItem->quantity,
                        'unit_price' => $unitPrice,
                        'total_price' => $lineTotalPrice, // Tính tổng theo dòng luôn cho sướng
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }

                // Xoá giỏ hàng sau khi tính xong
                CartItem::where('user_id', $userId)->delete();
            } elseif ($request->checkout_type === "buy_now") {
                // Nhánh mua thẳng bỏ qua cart
                $validatedBuyNow = $request->validate([
                    'product_id' => 'required|exists:products,id',
                    'size_id' => 'nullable|exists:sizes,id',
                    'topping_ids' => 'nullable|array',
                    'topping_ids.*' => 'exists:toppings,id',
                    'quantity' => 'required|integer|min:1',
                ]);

                $pId = $validatedBuyNow['product_id'];
                $sId = $validatedBuyNow['size_id'] ?? null;
                $tIds = $validatedBuyNow['topping_ids'] ?? [];
                $qty = $validatedBuyNow['quantity'];

                $unitPrice = $this->calculateUnitPrice($pId, $sId, $tIds);
                $lineTotalPrice = $unitPrice * $qty;
                $totalPrice += $lineTotalPrice;

                $product = Product::find($pId);
                $size = $sId ? Size::find($sId) : null;
                $toppingNames = !empty($tIds) ? Topping::whereIn('id', $tIds)->pluck('name')->toArray() : [];

                $orderItemsData[] = [
                    'order_id' => $order->id,
                    'product_id' => $pId,
                    'product_name' => $product->name,
                    'size_name' => $size ? $size->name : 'Mặc định',
                    'toppings' => json_encode($toppingNames, JSON_UNESCAPED_UNICODE),
                    'quantity' => $qty,
                    'unit_price' => $unitPrice,
                    'total_price' => $lineTotalPrice,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Loại thanh toán không hợp lệ!'], 400);
            }

            // Lưu order items vào DB
            DB::table('order_items')->insert($orderItemsData);

            // Cập nhật tổng tiền cho đơn hàng
            $order->total_price = $totalPrice;
            $order->save();

            DB::commit();

            return response()->json($order, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Lỗi khi tạo đơn hàng: " . $e->getMessage());
            return response()->json(['message' => 'Tạo đơn hàng thất bại!'], 500);
        }
    }

    private function calculateUnitPrice($productId, $sizeId = null, $toppingIds = [])
    {
        $product = Product::find($productId);

        if (!$product) {
            return 0;
        }

        $finalPrice = 0;

        if ($sizeId) {
            $productsizePrice = DB::table('product_sizes')
                ->where('product_id', $productId)
                ->where('size_id', $sizeId)
                ->value('price');

            $finalPrice += $productsizePrice ?: $product->price;
        } else {
            $finalPrice += $product->price;
        }

        if (!empty($toppingIds)) {
            // Đảm bảo ép chuẩn mọi kiêu dữ liệu truyền vào thành mảng thật
            $toppingArray = is_string($toppingIds) ? json_decode($toppingIds, true) : $toppingIds;
            $toppingArray = (array) $toppingArray;

            // Đếm số lượng ID bên trong mới truy vấn (Chống SQL nổ do mảng rỗng)
            if (count($toppingArray) > 0) {
                $toppingsPrice = DB::table('toppings')
                    ->whereIn('id', $toppingArray) // DÙNG BIẾN ĐÃ ÉP KIỂU
                    ->sum('price');

                $finalPrice += $toppingsPrice;
            }
        }

        return $finalPrice;
    }
}
