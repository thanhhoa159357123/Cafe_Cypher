<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;

class DashBoardController extends Controller
{
    public function getDashboard()
    {
        // 1. Thống kê tổng quan
        $totalRevenue = Order::where('status', 'completed')->sum('total_price');
        $newOrdersCount = Order::where('status', 'pending')->count();
        $totalProducts = Product::count();
        $totalCustomers = User::where('role', 'client')->count();

        // 2. Lấy 5 đơn hàng mới nhất
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // 3. Dữ liệu biểu đồ doanh thu 7 ngày qua
        $chartData = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $revenue = Order::where('status', 'completed')
                ->whereDate('created_at', $date)
                ->sum('total_price');

            $chartData[] = [
                'date' => $date->format('d/m'),
                'revenue' => (float) $revenue,
            ];
        }

        return response()->json([
            'stats' => [
                'total_revenue' => (float) $totalRevenue,
                'new_orders' => (int) $newOrdersCount,
                'total_products' => (int) $totalProducts,
                'total_customers' => (int) $totalCustomers,
            ],
            'recent_orders' => $recentOrders,
            'chart_data' => $chartData
        ]);
    }
}
