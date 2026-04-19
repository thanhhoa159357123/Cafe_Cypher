<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ToppingRequest extends FormRequest
{
    /**
     * Xác định người dùng có quyền thực hiện request này không.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Quy tắc validation cho topping.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Lấy ID của topping hiện tại (nếu là update)
        $toppingId = $this->route('topping')?->id ?? $this->route('topping');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('toppings')->ignore($toppingId),
            ],
            'price' => 'required|numeric|min:0',
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
            'name.required' => 'Tên topping không được để trống.',
            'name.unique' => 'Tên topping này đã tồn tại rồi!',
            'name.max' => 'Tên topping không được vượt quá 255 ký tự.',
            'price.required' => 'Giá topping không được để trống.',
            'price.numeric' => 'Giá topping phải là số.',
            'price.min' => 'Giá topping không được âm.',
        ];
    }
}
