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
        // 2. Dùng Auth::check() thay vì auth()->check()
        if (!Auth::check()) {
            return redirect('/login');
        }

        // 3. Dùng Auth::user() và bổ sung type hint @var để tránh lỗi không tìm thấy property `role`
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $userRole = $user->role;

        if (in_array($userRole, $roles)) {
            return $next($request);
        }

        return abort(403, 'Bạn không có quyền truy cập khu vực này!');
    }
}
