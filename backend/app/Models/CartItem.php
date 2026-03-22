<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    protected $fillable = [
        'cart_id',
        'product_id',
        'size_id',
        'topping_ids',
        'quantity',
    ];

    // Ép kiểu (Cast) JSON trong Database thành Array trong PHP tự động
    protected function casts(): array
    {
        return [
            'topping_ids' => 'array',
        ];
    }

    // Gắn thêm field ảo 'toppings' vào kết quả trả về khi JSON hóa
    protected $appends = ['toppings'];

    // Accessor: Tự động lấy danh sách model Topping dựa trên mảng topping_ids
    public function getToppingsAttribute()
    {
        if (empty($this->topping_ids)) {
            return [];
        }
        return Topping::whereIn('id', $this->topping_ids)->get();
    }

    // Thuộc về một giỏ hàng
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    // Thuộc về một sản phẩm
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Thuộc về một Size (có thể null)
    public function size()
    {
        return $this->belongsTo(Size::class);
    }
}
