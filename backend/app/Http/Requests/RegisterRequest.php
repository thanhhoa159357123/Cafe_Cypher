<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'last_name'  => 'required|string|max:255',
            'first_name' => 'required|string|max:255',
            'email'      => 'required|email|unique:users,email', // Cực quan trọng: Bắt buộc không được trùng email trong bảng users
            'password'   => 'required|string|min:6',
        ];
    }
    /**
     * Viết lại lời nhắn lỗi bằng Tiếng Việt để Frontend bắt được và in ra Toast
     */
    public function messages(): array
    {
        return [
            'last_name.required'  => 'Bạn ơi, quên nhập Họ kìa!',
            'first_name.required' => 'Bạn ơi, quên nhập Tên kìa!',
            'email.required'      => 'Email không được để trống nhé.',
            'email.email'         => 'Email này nhìn không giống định dạng chuẩn lắm.',
            'email.unique'        => 'Email này đã có người đăng ký rồi. Bạn thử đăng nhập xem?',
            'password.required'   => 'Không có mật khẩu sao bảo vệ tài khoản được!',
            'password.min'        => 'Mật khẩu phải có ít nhất 6 ký tự cho an toàn nhé.',
        ];
    }
}
