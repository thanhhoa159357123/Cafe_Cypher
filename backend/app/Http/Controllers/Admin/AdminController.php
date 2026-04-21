<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function login(AdminLoginRequest $request)
    {
        // 1. Tìm user bằng email trước (Để tiết kiệm CPU, không băm mật khẩu nếu không cần thiết)
        $user = User::where('email', $request->email)->first();

        // 2. Nếu không có user NÀY, hoặc user NÀY là Client -> Trả lỗi CHUNG ngay lập tức
        if (!$user || !in_array($user->role, ['admin', 'staff'])) {
            // Cố tình delay 1 chút xíu (Timing attack prevention) để hacker không biết là lỗi do email hay do pass
            usleep(500000); // Ngủ 0.5s
            return response()->json(['message' => 'Sai email, mật khẩu hoặc quyền truy cập!'], 401);
        }

        // 3. Lúc này chắc chắn là email của Admin/Staff rồi, mới bắt đầu check Password
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Sai email, mật khẩu hoặc quyền truy cập!'], 401);
        }

        // 4. Mọi thứ ok, tạo token
        $token = $user->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công',
            'token' => $token,
            'user' => new UserResource($user)
        ], 200);
    }

    public function logout(\Illuminate\Http\Request $request)
    {
        // Thu hồi token hiện tại của Admin
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Đã đăng xuất khỏi hệ thống quản trị!'
        ]);
    }
}
