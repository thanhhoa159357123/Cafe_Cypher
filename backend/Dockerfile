FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev zip git unzip libpq-dev \
    && docker-php-ext-install gd pdo pdo_pgsql pgsql bcmath pcntl posix

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader --no-scripts

RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache && \
    chmod -R 777 storage bootstrap/cache

EXPOSE 8080

# CHỈ BẬT SERVER - KHÔNG MIGRATE Ở ĐÂY
CMD php artisan config:cache && \
    php artisan route:cache && \
    php -S 0.0.0.0:${PORT:-8000} -t public
