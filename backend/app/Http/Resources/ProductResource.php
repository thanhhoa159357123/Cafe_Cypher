<?php

namespace App\Http\Resources;

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

            'sizes' => $this->whenLoaded('sizes', function () {
                return $this->sizes->map(function ($size) {
                    return [
                        'id' => $size->id,
                        'name' => $size->name,
                        'price' => (float) $size->pivot->price,
                    ];
                });
            }) ?? [],
            'toppings' => $this->whenLoaded('toppings', function () {
                return $this->toppings->map(function ($tp) {
                    return [
                        'id' => $tp->id,
                        'name' => $tp->name,
                        'price' => (float) $tp->price,
                    ];
                });
            }) ?? [],
            // 'toppings' => ToppingResource::collection($this->whenLoaded('toppings')) ?? null,
        ];
    }
}
