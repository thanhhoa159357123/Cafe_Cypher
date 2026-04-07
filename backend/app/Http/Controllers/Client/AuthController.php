<?php

namespace App\Http\Controllers\Client;

// 2. Thêm dòng này để nó nhận diện được file Controller gốc ở ngoài
use App\Http\Controllers\Controller;
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
        $validatedData = $request->validated();
        $validatedData['password'] = bcrypt($validatedData['password']);
        $validatedData['role'] = 'client'; // Mặc định role là client khi đăng ký từ Client App

        $user = User::create($validatedData);

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

    /**
     * CẬP NHẬT THÔNG TIN CÁ NHÂN (MỀM)
     * - Không yêu cầu mật khẩu.
     * - Chỉ cập nhật các trường cơ bản như tên, số điện thoại, địa chỉ.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateInformation(Request $request)
    {
        // 1. Lấy thông tin user đang gửi request (đã được middleware xác thực qua Token)
        $user = $request->user();

        // 2. Ép kiểu và kiểm duyệt dữ liệu (Tránh user gửi data rác hoặc cố tình hack field 'role')
        $validatedData = $request->validate([
            'first_name' => 'sometimes|required|string|max:50',
            'last_name'  => 'sometimes|required|string|max:50',
            'email'      => 'sometimes|required|email|unique:users,email,' . $user->id, // Unique nhưng cho phép giữ email cũ
        ]);

        // 3. Cập nhật vào DB
        $user->update($validatedData);

        // 4. Trả về cục user mới tinh để Front-end (Zustand) nạp lại vào State
        return response()->json([
            'message' => 'Cập nhật thông tin thành công!',
            'user'    => $user
        ]);
    }

    /**
     * ĐỔI MẬT KHẨU
     * - Bắt buộc phải xác nhận mật khẩu cũ.
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request)
    {
        $user = $request->user();

        // 1. Validate form gửi lên
        $request->validate([
            'current_password' => 'required|string',
            'new_password'     => 'required|string|min:6|confirmed', // 'confirmed' tự động check khớp với field 'new_password_confirmation'
        ]);

        // 2. Kiểm tra mật khẩu cũ xem có khớp trong DB không
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'message' => 'Mật khẩu hiện tại không chính xác!'
            ], 400); // Trả về 400 Bad Request
        }

        // 3. Băm mật khẩu mới và lưu lại
        $user->update([
            'password' => bcrypt($request->new_password)
        ]);

        return response()->json([
            'message' => 'Đổi mật khẩu thành công! Hãy cất kỹ nhé.'
        ]);
    }
}
