<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    // Dữ liệu được chép vào database
    protected $fillable = [
        'name',
        'slug',
        'parent_id',
    ];

    // Một category có thể có nhiều category con
    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    // Một category có thể có một category cha
    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    // Một category có thể có nhiều sản phẩm
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
