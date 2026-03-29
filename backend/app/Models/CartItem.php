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
