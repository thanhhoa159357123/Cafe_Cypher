<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SizeRequest extends FormRequest
{
    /**
     * Xác định người dùng có quyền thực hiện request này không.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Quy tắc validation cho size.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Lấy ID của size hiện tại (nếu là update)
        $sizeId = $this->route('size')?->id ?? $this->route('size');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('sizes')->ignore($sizeId),
            ],
        ];
    }

    /**
     * Thông báo lỗi tùy chỉnh bằng tiếng Việt.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Tên size không được để trống.',
            'name.unique' => 'Tên size này đã tồn tại rồi!',
            'name.max' => 'Tên size không được vượt quá 255 ký tự.',
        ];
    }
}
