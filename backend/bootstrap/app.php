<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
        // Tắt khiên CSRF cho toàn bộ hệ thống (Chỉ dùng lúc test Postman thôi nhé!)
        // $middleware->validateCsrfTokens(except: [
        //     '*' // Dấu * nghĩa là tha cho tất cả các đường dẫn. Bác có thể đổi thành ['login', 'register'] cho an toàn hơn.
        // ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
