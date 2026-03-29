<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'total_price',
        'status',
        'payment_method',
        'payment_status',
        'paid_at',
        'shipping_address',
        'shipping_phone',
        'note',
    ];

    // Một đơn hàng thuộc về một User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Một đơn hàng có nhiều mặt hàng (OrderItem)
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
