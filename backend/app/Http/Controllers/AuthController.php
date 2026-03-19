<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash; // Quan trọng: Để kiểm tra mật khẩu

class AuthController extends Controller
{
    // 1. ĐĂNG KÝ
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'last_name' => $request->last_name,
            'first_name' => $request->first_name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'message' => 'Tạo tài khoản thành công',
            'user' => $user
        ], 201);
    }

    // 2. ĐĂNG NHẬP (Bỏ hẳn Session, dùng Token)
    public function login(LoginRequest $request)
    {
        // Tìm user
        $user = User::where('email', $request->email)->first();

        // Kiểm tra mật khẩu thủ công để né lỗi Session Store
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Sai Email hoặc Mật khẩu rồi ba!'], 401);
        }

        $user->tokens()->delete(); // Xóa token cũ nếu có, tránh rối loạn token

        // Tạo Token "thẻ bài"
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    // 3. ĐĂNG XUẤT (Xóa Token)
    public function logout(Request $request)
    {
        // Xóa token hiện tại của user
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đã đăng xuất, Token đã bị hủy!']);
    }
}
