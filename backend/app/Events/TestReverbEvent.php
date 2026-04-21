<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TestReverbEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message; // Khai báo biến này để Laravel biết đường mà gửi đi

    public function __construct($message) // Nhận tin nhắn từ Tinker vào đây
    {
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        // PHẢI LÀ Channel (Công cộng) để test cho dễ
        return [
            new Channel('test-channel'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'test-reverb';
    }
}
