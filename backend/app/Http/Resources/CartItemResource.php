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
            'product' => $this->whenLoaded('product', function () {
                return [
                    'id' => $this->product->id,
                    'name' => $this->product->name,
                    'price' => (float) $this->product->price,
                    'image' => $this->product->image_url,
                    'description' => $this->product->description,
                ];
            }),
            // Xử lý Size CỰC MƯỢT (Không query DB)
            'size' => $this->whenLoaded('size', function () {
                $sizePrice = 0;
                // Chỉ lấy pivot price nếu product và sizes đã được eager load
                if ($this->relationLoaded('product') && $this->product->relationLoaded('sizes')) {
                    $productSize = $this->product->sizes->where('id', $this->size_id)->first();
                    $sizePrice = $productSize ? $productSize->pivot->price : 0;
                }

                return [
                    'id' => $this->size->id,
                    'name' => $this->size->name,
                    'price' => (float) $sizePrice,
                ];
            }),
            // Toppings: Lấy từ mảng preloaded controller nhét vào
            'toppings' => $this->whenLoaded('toppings', function () {
                return $this->toppings->map(function ($topping) {
                    return [
                        'id' => $topping->id,
                        'name' => $topping->name,
                        'price' => (float) $topping->price,
                    ];
                });
            }, function () {
                // Fallback nếu có dùng $this->preloaded_toppings
                if (isset($this->preloaded_toppings)) {
                    return collect($this->preloaded_toppings)->map(function ($topping) {
                        return [
                            'id' => $topping->id,
                            'name' => $topping->name,
                            'price' => (float) $topping->price,
                        ];
                    })->values();
                }
                return [];
            }),
        ];
    }
}
