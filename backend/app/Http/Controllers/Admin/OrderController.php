<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Resources\OrderResource;

class OrderController extends Controller
{
    /**
     * Lấy danh sách đơn hàng hiện tại
     *
     * @return \Illuminate\Http\Response
     */
    public function getAllOrders()
    {
        $orders = Order::with(['user', 'items.product'])->paginate(10);
        return OrderResource::collection($orders);
    }

    /**
     * Xem chi tiết đơn hàng
     */
    public function getOrder($id)
    {
        $order = Order::with(['user', 'items.product'])->findOrFail($id);

        return new OrderResource($order);
    }

    /**
     * Cập nhật trạng thái đơn hàng
     *
     * @request \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function updateOrderStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $userRole = $request->user()->role;

        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,shipping,completed,cancelled',
            'cancel_reason' => 'nullable|string|max:255'
        ]);

        $newStatus = $validated['status'];

        if ($userRole === 'staff') {
            // Staff không được phép hủy đơn
            if ($newStatus === 'cancelled') {
                return response()->json([
                    'message' => 'Nhân viên không có quyền hủy đơn hàng này!'
                ], 403);
            }
        }

        if ($newStatus === 'cancelled') {
            $order->cancelled_by = $userRole;
            $order->cancel_reason = $validated['cancel_reason'] ?? ($userRole === 'admin' ? 'Admin báo hủy' : 'Hủy bởi hệ thống');
        }

        if ($newStatus === 'completed' && $order->payment_method === 'cash') {
            $order->payment_status = 'paid';
            $order->paid_at = now();
        }

        $order->status = $newStatus;
        $order->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái đơn hàng thành công!',
            'order' => $order
        ]);
    }

    /**
     * Lọc đơn hàng theo tên, thời gian và trạng thái
     */
    public function filterOrders(Request $request)
    {
        $query = Order::with(['user', 'items.product']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%")
                    ->orWhere('id', $search);
            });
        }

        if ($request->has('user_id')) {
            $query->where('user_id', $request->input('user_id'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('date_from') && $request->input('date_from') != '') {
            $query->whereDate('created_at', '>=', $request->input('date_from'));
        }

        if ($request->has('date_to') && $request->input('date_to') != '') {
            // Thêm <= để tính đến hết ngày đó
            $query->whereDate('created_at', '<=', $request->input('date_to'));
        }

        $orders = $query->paginate(10);

        return OrderResource::collection($orders);
    }
}
