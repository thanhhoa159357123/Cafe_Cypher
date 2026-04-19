<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topping extends Model
{
    /** @use HasFactory<\Database\Factories\ToppingFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'price', 'status'];

    // Tạo cầu nối tới sản phẩm (nhiều-nhiều)
    public function product()
    {
        return $this->belongsToMany(Product::class, 'product_topping');
    }
}
