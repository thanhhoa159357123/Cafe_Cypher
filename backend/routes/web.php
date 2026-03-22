<?php

use Illuminate\Support\Facades\Route;

// Để trống hoặc chỉ return view welcome
Route::get('/', function () {
    return view('welcome');
});

Route::get('logs', [\Rap2hpoutre\LaravelLogViewer\LogViewerController::class, 'index']);
