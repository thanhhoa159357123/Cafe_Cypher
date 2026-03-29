<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
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
            'total_price' => (float) $this->total_price,
            'status' => $this->status,
            // Sử dụng CartItemResource để chuyển đổi danh sách các item
            'items' => CartItemResource::collection($this->whenLoaded('items')),
        ];
    }
}
