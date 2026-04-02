<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class OrderResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'order_code'       => $this->order_number,
            'total_price'      => (float) $this->total_price,
            'status'           => $this->status,
            'payment' => [
                'method' => $this->payment_method,
                'status' => $this->payment_status,
                'paid_at' => $this->paid_at ? Carbon::parse($this->paid_at)->format('d/m/Y H:i') : null,
            ],
            'shipping' => [
                'address' => $this->shipping_address,
                'phone'   => $this->shipping_phone,
                'note'    => $this->note,
            ],
            'items'            => OrderItemResource::collection($this->whenLoaded('items')),
            'created_at'       => Carbon::parse($this->created_at)->format('d/m/Y H:i'),
        ];
    }
}
