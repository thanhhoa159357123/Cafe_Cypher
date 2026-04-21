# 1. Chọn bản PHP 8.2 bản CLI (phù hợp chạy các lệnh ngầm như Reverb)
FROM php:8.2-cli

# 2. Cài đặt các thư viện hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install gd pdo pdo_pgsql pgsql bcmath pcntl posix

# 3. Cài Composer để quản lý thư viện PHP
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Đặt thư mục làm việc là /app
WORKDIR /app

# 5. Copy toàn bộ code từ thư mục backend vào container
COPY . .

# 6. Cài đặt các thư viện trong composer.json (bỏ qua dev để nhẹ)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 7. Cấp quyền cho các thư mục quan trọng để không bị lỗi 500
RUN mkdir -p /app/storage /app/bootstrap/cache && \
    chown -R www-data:www-data /app/storage /app/bootstrap/cache && \
    chmod -R 775 /app/storage /app/bootstrap/cache

# 8. Railway sẽ map cổng này ra ngoài
EXPOSE 8080

# 9. Lệnh "chốt hạ" để khởi động hệ thống
# - Migrate: Cập nhật bảng
# - Seed: Đổ data (nếu lỗi trùng thì bỏ qua nhờ || true)
# - Reverb start: Chạy server Websocket ở cổng 8080 và cho chạy ngầm (&)
# - Serve: Chạy API chính ở cổng 8080
CMD php artisan config:clear && \
    php artisan migrate --force && \
    (php artisan db:seed --force || true) && \
    (php artisan reverb:start --host 0.0.0.0 --port 8080 &) && \
    php artisan serve --host 0.0.0.0 --port 8080
