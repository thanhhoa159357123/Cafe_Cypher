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
            // Sửa lại thành order_number cho khớp frontend
            'order_number'     => $this->order_number,
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
            // Các trường riêng cho Admin
            'cancel_reason'    => $this->cancel_reason,
            'cancelled_by'     => $this->cancelled_by,

            // Các quan hệ
            'user'             => $this->whenLoaded('user'), // Tự động load nếu có With
            'items'            => OrderItemResource::collection($this->whenLoaded('items')),
            'created_at'       => $this->created_at->toIso8601String(),
        ];
    }
}
