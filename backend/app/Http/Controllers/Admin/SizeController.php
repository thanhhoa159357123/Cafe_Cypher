<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SizeRequest;
use App\Models\Size;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SizeController extends Controller
{
    /**
     * Lấy danh sách tất cả các size
     */
    public function getSizes()
    {
        $sizes = Size::withTrashed()->get();
        return response()->json($sizes);
    }

    /**
     * Thêm size mới
     *
     * @param  \App\Http\Requests\Admin\SizeRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function createSize(SizeRequest $request)
    {
        Log::info("Dữ liệu size nhận được từ client: " . json_encode($request->all()));

        $data = $request->validated();

        $size = Size::create($data);

        Log::info("Size mới tạo: " . json_encode($size));
        Cache::forget('client_sizes'); // Xóa cache để FE Client cập nhật Size mới
        return response()->json([
            'message' => 'Thêm size thành công!',
            'data' => $size,
        ], 201);
    }

    /**
     * Cập nhật size
     *
     * @param  \App\Http\Requests\Admin\SizeRequest  $request
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateSize(SizeRequest $request, Size $size)
    {
        Log::info("Dữ liệu cập nhật size nhận được: " . json_encode($request->all()));

        $data = $request->validated();

        $size->update($data);

        Log::info("Size sau khi cập nhật: " . json_encode($size));
        Cache::forget('client_sizes'); // Xóa cache để FE Client cập nhật Size mới
        return response()->json([
            'message' => 'Cập nhật size thành công!',
            'data' => $size,
        ]);
    }

    /**
     * Xóa mềm size
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteSize(Size $size)
    {
        // Kiểm tra xem size có đang được sử dụng trong sản phẩm nào không
        if ($size->product()->count() > 0) {
            return response()->json([
                'message' => 'Không thể xóa size này vì đang có sản phẩm liên quan. Bạn có thể ẩn size bằng cách chuyển trạng thái.',
            ], 400);
        }

        $sizeId = $size->id;
        $size->delete(); // Soft delete (chỉ set deleted_at)

        Log::info("Đã xóa mềm size ID: " . $sizeId);
        Cache::forget('client_sizes'); // Xóa cache để FE Client cập nhật Size mới
        return response()->json([
            'message' => 'Size đã được xóa thành công.',
        ]);
    }

    /**
     * Chuyển đổi trạng thái size (active <-> inactive)
     *
     * @param  \App\Models\Size  $size
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleStatus(Size $size)
    {
        try {
            $size->status = ($size->status === 'active') ? 'inactive' : 'active';
            $size->save();

            Log::info("Đã chuyển trạng thái size ID: {$size->id} sang {$size->status}");
            Cache::forget('client_sizes'); // Xóa cache để FE Client cập nhật Size mới
            return response()->json([
                'message' => 'Cập nhật trạng thái size thành công!',
                'data' => $size,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra, vui lòng thử lại!',
            ], 500);
        }
    }

    /**
     * Khôi phục size đã xóa mềm
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restoreSize($id)
    {
        $size = Size::withTrashed()->findOrFail($id);
        $size->restore();

        Log::info("Đã khôi phục size ID: " . $id);
        Cache::forget('client_sizes'); // Xóa cache để FE Client cập nhật Size mới
        return response()->json([
            'message' => 'Size đã được khôi phục thành công.',
            'data' => $size,
        ]);
    }
}
