<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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
            'email'    => 'required|email',
            'password' => 'required|min:6',
        ];
    }
    /**
     * Viết lại lời nhắn lỗi bằng Tiếng Việt để Frontend bắt được và in ra Toast
     */
    public function messages(): array
    {
        return [
            'email.required'    => 'Ủa, email đâu rồi ông giáo?',
            'email.email'       => 'Email này nhìn hơi "lạ", check lại tí đi!',
            'password.required' => 'Mật khẩu là chìa khóa vào quán mà, nhập đi chứ!',
            'password.min'      => 'Mật khẩu ít nhất 6 ký tự mới mở được cửa nha.',
        ];
    }
}
