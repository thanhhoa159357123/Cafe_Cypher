<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài

use App\Events\NewOrderEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
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

        // Lấy danh sách đơn hàng, kèm theo items
        $orders = Order::with(['items'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'Bạn chưa có đơn hàng nào!'], 200);
        }

        // Trả về qua Resource
        return OrderResource::collection($orders);
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
                $cart = Cart::with(['items.product', 'items.size'])->where('user_id', $userId)->first();
                $cartItems = $cart ? $cart->items : collect();

                if ($cartItems->isEmpty()) {
                    DB::rollBack();
                    return response()->json(['message' => 'Giỏ hàng trống!'], 400);
                }

                // Lấy toàn bộ giá Size
                $allProductIds = $cartItems->pluck('product_id')->unique()->filter()->toArray();
                $allSizeIds = $cartItems->pluck('size_id')->unique()->filter()->toArray();

                $allProductSizes = DB::table('product_sizes')
                    ->whereIn('product_id', $allProductIds)
                    ->whereIn('size_id', $allSizeIds)
                    ->get();

                // Lấy toàn bộ Topping (Cả Giá và Tên để làm Snapshot)
                $allToppingIds = [];
                foreach ($cartItems as $item) {
                    $tIds = is_string($item->topping_ids) ? json_decode($item->topping_ids, true) : $item->topping_ids;
                    if (is_array($tIds)) {
                        $allToppingIds = array_merge($allToppingIds, $tIds);
                    }
                }
                // Query lấy 1 lần, lưu thành array object trên RAM: [id => {name, price}]
                $allToppingsData = Topping::whereIn('id', $allToppingIds)->get()->keyBy('id');

                foreach ($cartItems as $cartItem) {
                    $itemPrice = 0;
                    $hasSizePrice = false;

                    // 1. Tính tiền Size
                    if ($cartItem->product_id && $cartItem->size_id) {
                        $productSize = $allProductSizes
                            ->where('product_id', $cartItem->product_id)
                            ->where('size_id', $cartItem->size_id)
                            ->first();

                        if ($productSize && $productSize->price > 0) {
                            $itemPrice += $productSize->price;
                            $hasSizePrice = true;
                        }
                    }

                    // 2. Fallback giá gốc
                    if (!$hasSizePrice && $cartItem->product) {
                        $itemPrice += $cartItem->product->price;
                    }

                    // 3. Tính tiền Topping & Lấy Tên Snapshot
                    $toppingNames = [];
                    $tIds = is_string($cartItem->topping_ids) ? json_decode($cartItem->topping_ids, true) : $cartItem->topping_ids;

                    if (is_array($tIds) && !empty($tIds)) {
                        foreach ($tIds as $tId) {
                            // Rút data từ mảng RAM $allToppingsData
                            if ($allToppingsData->has($tId)) {
                                $toppingObj = $allToppingsData->get($tId);
                                $itemPrice += $toppingObj->price; // Cộng tiền
                                $toppingNames[] = $toppingObj->name; // Lưu tên
                            }
                        }
                    }

                    $lineTotalPrice = $itemPrice * $cartItem->quantity;
                    $totalPrice += $lineTotalPrice;

                    $orderItemsData[] = [
                        'order_id' => $order->id,
                        'product_id' => $cartItem->product_id,
                        'product_name' => $cartItem->product ? $cartItem->product->name : 'SP Đã xóa',
                        'image_url' => $cartItem->product ? $cartItem->product->image_url : null,
                        'size_name' => $cartItem->size ? $cartItem->size->name : 'Mặc định',
                        'toppings' => json_encode($toppingNames, JSON_UNESCAPED_UNICODE),
                        'quantity' => $cartItem->quantity,
                        'unit_price' => $itemPrice,
                        'total_price' => $lineTotalPrice,
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                }

                // Xoá giỏ hàng sau khi tạo đơn xong
                CartItem::where('cart_id', $cart->id)->delete();
            } elseif ($request->checkout_type === "buy_now") {
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

                // Query lấy thẳng cục Product và Size
                $product = Product::find($pId);
                $size = $sId ? Size::find($sId) : null;

                $itemPrice = 0;
                $hasSizePrice = false;

                // Tính tiền Size (Query 1 phát)
                if ($sId) {
                    $productSizePrice = DB::table('product_sizes')
                        ->where('product_id', $pId)
                        ->where('size_id', $sId)
                        ->value('price');

                    if ($productSizePrice > 0) {
                        $itemPrice += $productSizePrice;
                        $hasSizePrice = true;
                    }
                }

                if (!$hasSizePrice) {
                    $itemPrice += $product->price;
                }

                // Tính tiền Topping & Lấy Tên (Query thêm 1 phát nữa là dứt điểm)
                $toppingNames = [];
                if (!empty($tIds)) {
                    $toppings = Topping::whereIn('id', $tIds)->get(); // Lấy cả cục Topping thay vì pluck
                    foreach ($toppings as $topping) {
                        $itemPrice += $topping->price; // Cộng tiền
                        $toppingNames[] = $topping->name; // Lưu tên
                    }
                }

                $lineTotalPrice = $itemPrice * $qty;
                $totalPrice += $lineTotalPrice;

                $orderItemsData[] = [
                    'order_id' => $order->id,
                    'product_id' => $pId,
                    'product_name' => $product->name,
                    'image_url' => $product->image_url,
                    'size_name' => $size ? $size->name : 'Mặc định',
                    'toppings' => json_encode($toppingNames, JSON_UNESCAPED_UNICODE),
                    'quantity' => $qty,
                    'unit_price' => $itemPrice,
                    'total_price' => $lineTotalPrice,
                    'created_at' => now(),
                    'updated_at' => now()
                ];
            } else {
                DB::rollBack();
                return response()->json(['message' => 'Loại thanh toán không hợp lệ!'], 400);
            }

            // Lưu order items vào DB (Dùng insert là cực nhanh)
            DB::table('order_items')->insert($orderItemsData);

            // Cập nhật tổng tiền
            $order->total_price = $totalPrice;
            $order->save();

            $order->refresh();
            broadcast(new NewOrderEvent($order));

            DB::commit();

            return response()->json($order, 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Lỗi khi tạo đơn hàng: " . $e->getMessage());
            return response()->json(['message' => 'Tạo đơn hàng thất bại!'], 500);
        }
    }

    /**
     * Hủy đơn hàng (chỉ dành cho khách hàng với đơn hàng trạng thái pending)
     */
    public function cancelOrder(Request $request, $id)
    {
        $userId = $request->user()->id;

        $order = Order::where('id', $id)->where('user_id', $userId)->first();

        if (!$order) {
            return response()->json(['message' => 'Đơn hàng không tồn tại hoặc không có quyền truy cập!'], 404);
        }

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Chỉ có thể hủy đơn hàng ở trạng thái chờ duyệt!'], 403);
        }

        $validated = $request->validate([
            'cancel_reason' => 'nullable|string|max:255'
        ]);

        $order->status = 'cancelled';
        $order->cancelled_by = $userId;
        $order->cancel_reason = $validated['cancel_reason'] ?? 'Khách hàng tự hủy';
        $order->save();

        return response()->json([
            'message' => 'Hủy đơn hàng thành công!',
            'order' => new OrderResource($order)
        ], 200);
    }
}
