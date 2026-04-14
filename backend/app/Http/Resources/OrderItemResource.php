<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'product_id'   => $this->product_id,
            'name'         => $this->product_name, // Lấy tên đã lưu trong đơn hàng
            'image_url'        => $this->image_url,
            'size'         => $this->size_name,
            'toppings'     => $this->toppings ?? [], // Đảm bảo là mảng
            'quantity'     => (int) $this->quantity,
            'unit_price'   => (float) $this->unit_price,
            'total'        => (float) $this->total_price,
        ];
    }
}
