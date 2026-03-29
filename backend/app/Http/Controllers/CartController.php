<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Topping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    /**
     * Lấy toàn bộ thông tin giỏ hàng đang active của user hiện tại.
     * Kèm theo dữ liệu eager_load (Product, Size) để tính toán hiển thị.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCart(Request $request)
    {
        $userId = $request->user()->id;

        $cart = Cart::with(['items.product', 'items.size'])
            ->where('user_id', $userId)
            ->where('status', 'active')
            ->first();

        // Không quăng lỗi 404 nếu không có giỏ hàng, chỉ cần trả về thông báo để FE hiển thị UI giỏ trống
        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Giỏ hàng trống!'], 200);
        }

        // --- CHIÊU TỐI ƯU Topping BẰNG 1 QUERY DUY NHẤT ---
        // 1. Gom tất cả ID topping của mọi mặt hàng thành 1 mảng dẹp (flatten)
        $allToppingIds = $cart->items->flatMap(function ($item) {
            return is_array($item->topping_ids) ? $item->topping_ids : [];
        })->unique()->filter()->values();

        // 2. Query lấy ngần ấy Topping 1 lần duy nhất, key theo ID để tra cứu nhanh bằng Array
        $allToppingsData = Topping::whereIn('id', $allToppingIds)->get()->keyBy('id');

        // 3. Gài tạm mảng dữ liệu topping xuống từng Item cho Resource xài
        $cart->items->each(function ($item) use ($allToppingsData) {
            $myToppings = [];
            $ids = is_array($item->topping_ids) ? $item->topping_ids : [];
            foreach ($ids as $tid) {
                if (isset($allToppingsData[$tid])) {
                    $myToppings[] = $allToppingsData[$tid];
                }
            }
            // Gán dữ liệu vào 1 thuộc tính ảo để truyền sang Resource
            $item->preloaded_toppings = $myToppings;
        });

        return new CartResource($cart);
    }

    /**
     * Thêm sản phẩm vào giỏ hàng.
     * Cùng một sản phẩm (cùng size, cùng tập hợp topping) sẽ được cộng dồn số lượng.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addToCart(Request $request)
    {
        $userId = $request->user()->id;

        Log::info("=== THÊM SẢN PHẨM VÀO GIỎ HÀNG ===");

        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'size_id' => 'nullable|exists:sizes,id',
            'topping_ids' => 'nullable|array',
            'topping_ids.*' => 'exists:toppings,id',
            'quantity' => 'required|integer|min:1',
        ]);

        Log::info("Dữ liệu đã validate: " . json_encode($validated));

        $cart = Cart::firstOrCreate(
            ['user_id' => $userId, 'status' => 'active'],
            ['total_price' => 0]
        );

        // Ép kiểu và sắp xếp mảng topping để đảm bảo user gửi lên [1,2] và [2,1] được coi là giống nhau
        $requestToppings = $validated['topping_ids'] ?? [];
        $requestToppings = array_map('intval', $requestToppings);
        sort($requestToppings);

        // 2. Lấy tất cả items có cùng product_id và size_id
        $cartItems = $cart->items()
            ->where('product_id', $validated['product_id'])
            ->where('size_id', $validated['size_id'] ?? null)
            ->get();

        // So sánh topping bằng Collection của PHP thay vì Query DB
        // Vì SQL MySQL check mảng JSON (chưa kể thứ tự đảo lộn) rất phức tạp và thiếu chính xác
        $cartItem = $cartItems->first(function ($item) use ($requestToppings) {
            $itemToppings = $item->topping_ids ?? [];
            // Nếu Database lưu chuỗi JSON chưa được ép kiểu qua model thì decode
            if (is_string($itemToppings)) {
                $itemToppings = json_decode($itemToppings, true) ?? [];
            }
            $itemToppings = array_map('intval', $itemToppings);
            sort($itemToppings);

            return $itemToppings === $requestToppings;
        });

        // Nếu item đã tồn tại (cùng product_id, size_id và topping_ids giống hệt), tăng số lượng, còn không thì tạo mới
        if ($cartItem) {
            $cartItem->quantity += $validated['quantity'];
            $cartItem->save();
        } else {
            $validated['topping_ids'] = $requestToppings;
            $cart->items()->create($validated);
        }

        $this->calculateCartTotal($cart);

        return response()->json(['message' => 'Đã thêm sản phẩm vào giỏ hàng!'], 200);
    }

    /**
     * Xóa một sản phẩm cụ thể khỏi giỏ hàng dựa trên cart_item_id.
     * Nếu xóa hết sản phẩm trong giỏ thì tổng tiền sẽ về 0
     * Không xóa hẳn record Cart hiện tại để user có thể mua sắm tiếp ở giỏ cũ
     * @param \Illuminate\Http\Request $request
     * @param int $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeFromCart(Request $request, $itemId)
    {
        $userId = $request->user()->id;

        $cart = Cart::where('user_id', $userId)->where('status', 'active')->first();

        if (!$cart) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng!'], 404);
        }

        $cartItem = $cart->items()->where('id', $itemId)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm trong giỏ hàng!'], 404);
        }

        $cartItem->delete();

        if ($cart->items()->count() === 0) {
            $cart->update(['total_price' => 0]);
        }

        $this->calculateCartTotal($cart);

        return response()->json(['message' => 'Đã xóa sản phẩm khỏi giỏ hàng!'], 200);
    }

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng.
     * @param \Illuminate\Http\Request $request
     * @param int $itemId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateCartItem(Request $request, $itemId)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::where('user_id', $userId)->where('status', 'active')->first();

        if (!$cart) {
            return response()->json(['message' => 'Không tìm thấy giỏ hàng!'], 404);
        }

        $cartItem = $cart->items()->where('id', $itemId)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm trong giỏ hàng!'], 404);
        }

        $cartItem->quantity = $validated['quantity'];
        $cartItem->save();

        $this->calculateCartTotal($cart);

        return response()->json(['message' => 'Đã cập nhật số lượng sản phẩm!'], 200);
    }

    /**
     * Tính tổng tiền của giỏ hàng.
     * @param Cart $cart
     * @return void
     */
    private function calculateCartTotal(Cart $cart)
    {
        $total = 0;
        $items = $cart->items()->with(['product'])->get();

        Log::info("=== TÍNH LẠI TỔNG TIỀN CART ID: {$cart->id} ===");

        Log::info("Item hiện tại: " . $items);

        foreach ($items as $item) {
            $itemPrice = 0;
            $hasSizePrice = false;

            // 1. Tìm giá theo size trước
            if ($item->product_id && $item->size_id) {
                $productSize = DB::table('product_sizes')
                    ->where('product_id', $item->product_id)
                    ->where('size_id', $item->size_id)
                    ->first();

                if ($productSize && $productSize->price > 0) {
                    $itemPrice += $productSize->price;
                    $hasSizePrice = true;
                    Log::info("- Lấy giá từ product_sizes: {$productSize->price}");
                } else {
                    Log::warning("- Cảnh báo: Không tìm thấy giá trong product_sizes cho Product ID {$item->product_id} và Size ID {$item->size_id}");
                }
            }

            // 2. Fallback: Nếu không có size hoặc DB không tìm thấy liên kết cho size này, lấy giá gốc
            if (!$hasSizePrice && $item->product) {
                $itemPrice += $item->product->price;
                Log::info("- KHÔNG CÓ SIZE -> Lấy giá gốc Product: {$item->product->price}");
            }

            // 3. Tiền Toppings
            $toppingIds = $item->topping_ids ?? [];
            if (!empty($toppingIds)) {
                $toppingsTotal = Topping::whereIn('id', $toppingIds)->sum('price');
                $itemPrice += $toppingsTotal;
                Log::info("- Tổng tiền Toppings: {$toppingsTotal}");
            }

            Log::info("- Tổng giá 1 item (đã cộng topping): {$itemPrice} | Số lượng: {$item->quantity}");

            // 4. Cộng (Giá 1 item * số lượng)
            $total += ($itemPrice * $item->quantity);
        }

        Log::info("=> TỔNG TIỀN CUỐI CÙNG CART: {$total}");
        Log::info("========================================");

        // Cập nhật lại tổng tiền cho giỏ hàng
        $cart->update(['total_price' => $total]);
    }
}
