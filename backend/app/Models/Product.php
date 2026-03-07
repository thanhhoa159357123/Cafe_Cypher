<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    // Khai báo biến fillable để cho phép các biến lưu vào database khi tạo mới hoặc cập nhật sản phẩm
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'category_id',
    ];

    // Thiết lập mối quan hệ giữa Product và Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Thiết lập mối quan hệ giữa Product và Topping (nhiều-nhiều)
    public function toppings()
    {
        return $this->belongsToMany(Topping::class, 'product_topping');
    }

    // Thiết lập mối quan hệ giữa Product và Size (nhiều-nhiều)
    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_sizes')->withPivot('price');
    }
}
