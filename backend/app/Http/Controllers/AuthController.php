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
    /**
     * ĐĂNG KÝ TÀI KHOẢN MỚI
     * - Nhận dữ liệu từ client (last_name, first_name, email, password)
     * - Tạo user mới trong database (hash mật khẩu)
     * - Trả về phản hồi JSON chứa thông báo thành công và thông tin user (không bao gồm mật khẩu)
     * @param \App\Http\Requests\RegisterRequest $request Yêu cầu đã được xác thực hợp lệ
     * @return \Illuminate\Http\JsonResponse JSON chứa thông báo và thông tin user mới tạo
     */
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

    /**
     * ĐĂNG NHẬP VÀ TẠO TOKEN
     * - Nhận dữ liệu từ client (email, password)
     * - Kiểm tra thông tin đăng nhập (tìm user theo email, kiểm tra mật khẩu)
     * - Nếu hợp lệ, tạo token mới cho user và trả về phản hồi JSON chứa token và thông tin user
     * - Nếu không hợp lệ, trả về phản hồi JSON chứa thông báo lỗi
     * @param \App\Http\Requests\LoginRequest $request Yêu cầu đã được xác thực hợp lệ
     * @return \Illuminate\Http\JsonResponse JSON chứa thông báo, token và thông tin user nếu thành công; hoặc thông báo lỗi nếu thất bại
     */
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

    /**
     * ĐĂNG XUẤT
     * - Xóa token hiện tại của user
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        // Xóa token hiện tại của user
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Đã đăng xuất, Token đã bị hủy!']);
    }
}
