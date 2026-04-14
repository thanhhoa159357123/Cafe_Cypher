<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Size extends Model
{
    /** @use HasFactory<\Database\Factories\SizeFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = ['name'];

    // Tạo cầu nối tới sản phẩm (nhiều-nhiều)
    public function product()
    {
        return $this->belongsToMany(Product::class, 'product_sizes');
    }
}
