FROM php:8.2-cli

# 1. Cài các extension tối thiểu nhất để Laravel sống được
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libpq-dev \
    && docker-php-ext-install gd pdo pdo_pgsql pgsql bcmath

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .

# 2. Cài thư viện
RUN composer install --no-dev --optimize-autoloader --no-scripts

# 3. Cấp quyền
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache && \
    chmod -R 777 storage bootstrap/cache

# 4. Port của Railway
EXPOSE 8080

# 5. LỆNH CHẠY SIÊU ĐƠN GIẢN (Bỏ qua Reverb để ưu tiên API sống trước)
CMD php artisan config:clear && \
    php artisan migrate --force && \
    (php artisan reverb:start --host 0.0.0.0 --port 8081 &) && \
    php -S 0.0.0.0:${PORT:-8080} -t public
