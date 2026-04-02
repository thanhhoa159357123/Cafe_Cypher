<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'image_url',
        'size_name',
        'toppings',
        'quantity',
        'unit_price',
        'total_price',
    ];

    protected $casts = [
        'toppings' => 'array',
    ];

    // Một mặt hàng thuộc về một đơn hàng
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Nếu product_id không null, có thể truy cập thông tin sản phẩm (nếu sản phẩm chưa bị xóa)
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    //  Nếu size_name không null, có thể truy cập thông tin size (nếu size chưa bị xóa)
    public function size()
    {
        return $this->belongsTo(Size::class, 'size_name', 'name');
    }
}
