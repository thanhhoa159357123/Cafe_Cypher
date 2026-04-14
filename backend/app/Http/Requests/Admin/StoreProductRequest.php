<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        // Nếu sizes là chuỗi JSON, giải mã nó thành mảng trước khi validate
        if ($this->has('sizes') && is_string($this->sizes)) {
            $this->merge([
                'sizes' => json_decode($this->sizes, true),
            ]);
        }

        // Nếu toppings là chuỗi JSON, giải mã nó thành mảng trước khi validate
        if ($this->has('toppings') && is_string($this->toppings)) {
            $this->merge([
                'toppings' => json_decode($this->toppings, true),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',

            // Validate mảng sizes (yêu cầu cấu trúc object {id, price})
            'sizes' => 'nullable|array',
            'sizes.*.id' => 'required_with:sizes|exists:sizes,id', // Kiểm tra ID có trong DB không
            'sizes.*.price' => 'required_with:sizes|numeric|min:0',

            // Validate mảng toppings (chỉ cần mảng ID)
            'toppings' => 'nullable|array',
            'toppings.*' => 'exists:toppings,id', // Kiểm tra Topping có trong DB không
        ];
    }

    public function messages(): array
    {
        return [
            'sizes.*.id.exists' => 'Một trong số các kích thước đã chọn không hợp lệ.',
            'toppings.*.exists' => 'Một trong số các topping đã chọn không tồn tại hệ thống.',
            // Thêm các custom message khác nếu cần
        ];
    }
}
