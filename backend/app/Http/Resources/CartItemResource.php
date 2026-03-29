<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            // Format gọn gàng cục Product
            'product' => [
                'id' => $this->product->id,
                'name' => $this->product->name,
                'price' => (float) $this->product->price,
                'image' => $this->product->image_url,
                'description' => $this->product->description,
            ],
            // Xử lý Size CỰC MƯỢT (Không query DB)
            'size' => $this->when($this->size, function () {
                // Ta tìm cái size tương ứng bên trong danh sách sizes của product đã dc Eager Load
                $productSize = $this->product->sizes->where('id', $this->size_id)->first();
                $sizePrice = $productSize ? $productSize->pivot->price : 0;

                return [
                    'id' => $this->size->id,
                    'name' => $this->size->name,
                    'price' => (float) $sizePrice,
                ];
            }),
            // Toppings: Lấy từ mảng preloaded controller nhét vào
            'toppings' => collect($this->preloaded_toppings ?? [])->map(function ($topping) {
                return [
                    'id' => $topping->id,
                    'name' => $topping->name,
                    'price' => (float) $topping->price,
                ];
            })->values(),
        ];
    }
}
