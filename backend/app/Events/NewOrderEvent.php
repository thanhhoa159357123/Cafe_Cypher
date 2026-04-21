<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct($order)
    {
        // Load quan hệ user nếu chưa có để lấy tên
        $order->loadMissing('user');

        $this->order = [
            'id'           => $order->id,
            'order_number' => $order->order_number,
            'total_price'  => $order->total_price,
            'status'       => $order->status,
            'customer_name' => $order->user->first_name . ' ' . $order->user->last_name,
            'created_at'   => $order->created_at->toDateTimeString(),
            // Nếu muốn xịn nữa thì gửi thêm số lượng món
            'items_count'  => $order->items()->count(),
        ];
    }

    public function broadcastOn(): array
    {
        return [new Channel('admin-orders')]; // Kênh dành cho Admin
    }

    public function broadcastAs(): string
    {
        return 'new-order';
    }
}
