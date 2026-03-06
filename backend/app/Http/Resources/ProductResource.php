<?php

namespace App\Http\Resources;

use App\Http\Resources\ToppingResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'name' => $this->name,
            'image' => $this->image_url ?? null,
            'description' => $this->description,
            'price' => (float) $this->price,
            'category' => CategoryResource::make($this->whenLoaded('category')) ?? null,
            'toppings' => ToppingResource::collection($this->whenLoaded('toppings')) ?? null,
        ];
    }
}
