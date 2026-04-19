<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // 1. Khai báo thêm facade Auth
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 2. Trả về JSON 401 nếu chưa đăng nhập (thay vì redirect về HTML)
        if (!Auth::check()) {
            return response()->json([
                'message' => 'Vui lòng đăng nhập để tiếp tục.'
            ], 401);
        }

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $userRole = $user->role;

        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        // 3. Trả về JSON 403 (thay vì văng HTML abort)
        return response()->json([
            'message' => 'Bạn không có quyền truy cập khu vực này!'
        ], 403);
    }
}
