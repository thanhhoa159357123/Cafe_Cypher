<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ToppingRequest;
use App\Models\Topping;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class ToppingController extends Controller
{
    /**
     * Lấy danh sách tất cả các topping
     */
    public function getToppings()
    {
        $toppings = Topping::withTrashed()->get();
        return response()->json($toppings);
    }

    /**
     * Thêm topping mới
     *
     * @param  \App\Http\Requests\Admin\ToppingRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createTopping(ToppingRequest $request)
    {
        Log::info("Dữ liệu topping nhận được từ client: " . json_encode($request->all()));

        $data = $request->validated();

        $topping = Topping::create($data);

        Log::info("Topping mới tạo: " . json_encode($topping));

        Cache::forget('client_toppings');
        return response()->json([
            'message' => 'Thêm topping thành công!',
            'data' => $topping,
        ], 201);

    }

    /**
     * Cập nhật topping
     *
     * @param  \App\Http\Requests\Admin\ToppingRequest  $request
     * @param  \App\Models\Topping  $topping
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopping(ToppingRequest $request, Topping $topping)
    {
        Log::info("Dữ liệu cập nhật topping nhận được: " . json_encode($request->all()));

        $data = $request->validated();

        $topping->update($data);

        Log::info("Topping sau khi cập nhật: " . json_encode($topping));

        Cache::forget('client_toppings');
        return response()->json([
            'message' => 'Cập nhật topping thành công!',
            'data' => $topping,
        ]);
    }

    /**
     * Xóa mềm topping
     *
     * @param  \App\Models\Topping  $topping
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteTopping(Topping $topping)
    {
        // Kiểm tra xem topping có đang được sử dụng trong sản phẩm nào không
        if ($topping->product()->count() > 0) {
            return response()->json([
                'message' => 'Không thể xóa topping này vì đang có sản phẩm liên quan.',
            ], 400);
        }

        $toppingId = $topping->id;
        $topping->delete(); // Soft delete (chỉ set deleted_at)

        Log::info("Đã xóa mềm topping ID: " . $toppingId);

        Cache::forget('client_toppings');
        return response()->json([
            'message' => 'Topping đã được xóa thành công.',
        ]);
    }
    /**
     * Chuyển đổi trạng thái topping (active <-> inactive)
     *
     * @param  \App\Models\Topping  $topping
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleStatus(Topping $topping)
    {
        try {
            $topping->status = ($topping->status === 'active') ? 'inactive' : 'active';
            $topping->save();

            Log::info("Đã chuyển trạng thái topping ID: {$topping->id} sang {$topping->status}");

            Cache::forget('client_toppings');
            return response()->json([
                'message' => 'Cập nhật trạng thái topping thành công!',
                'data' => $topping,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra, vui lòng thử lại!',
            ], 500);
        }
    }

    /**
     * Khôi phục topping đã xóa mềm
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restoreTopping($id)
    {
        $topping = Topping::withTrashed()->findOrFail($id);
        $topping->restore();

        Log::info("Đã khôi phục topping ID: " . $id);

        Cache::forget('client_toppings');
        return response()->json([
            'message' => 'Topping đã được khôi phục thành công.',
            'data' => $topping,
        ]);
    }
}
