<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topping extends Model
{
    /** @use HasFactory<\Database\Factories\ToppingFactory> */
    use HasFactory;

    protected $fillable = ['name', 'price'];

    // Tạo cầu nối tới sản phẩm (nhiều-nhiều)
    public function product()
    {
        return $this->belongsToMany(Product::class, 'product_topping');
    }
}
