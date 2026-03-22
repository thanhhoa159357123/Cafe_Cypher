<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'status',
    ];

    // Một giỏ hàng thuộc về một User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Một giỏ hàng có nhiều mặt hàng (CartItem)
    public function items()
    {
        return $this->hasMany(CartItem::class);
    }
}
