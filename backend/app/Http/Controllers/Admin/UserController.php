<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        Log::info('Admin requested user list', ['role' => $request->role]);

        $query = User::withCount('orders');

        if ($request->has('role')) {
            if ($request->role == 'client') {
                $query->where('role', 'client');
            } else if ($request->role == 'staff') {
                // Sửa lỗi where mảng thành whereIn
                $query->whereIn('role', ['staff', 'admin']);
            } else {
                return response()->json(['message' => 'Invalid role'], 400);
            }
        }

        // Nếu không truyền role thì sẽ lấy toàn bộ user
        $users = $query->get();

        return response()->json($users);
    }

    public function getUserById($id)
    {
        $user = User::withCount('orders')->findOrFail($id);
        $recentOrders = $user->orders()->latest()->take(5)->get();

        // Gắn 5 đơn này vào quan hệ 'orders' của user
        $user->setRelation('orders', $recentOrders);

        return response()->json($user);
    }
}
