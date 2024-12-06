import os
import requests
import base64
from bs4 import BeautifulSoup
from products.models import Product
from django.conf import settings


class KupilukiParser:
    BASE_URL = "https://lukoff.by/category/nazhimnye-ljuki-pod-plitku/stalnoj-ljuk-lukoff-st/"

    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }

    def fetch_html(self, url):
        """
        Получает HTML-код страницы.
        """
        try:
            response = requests.get(url, headers=self.HEADERS)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Ошибка при загрузке страницы {url}: {e}")
            return ""

    def parse_page(self, html):
        """
        Парсит HTML-страницу и извлекает данные о товарах.
        """
        soup = BeautifulSoup(html, 'lxml')
        product_cards = soup.find_all('div', class_='product-wrapper')

        if not product_cards:
            print("Не найдены карточки товаров. Проверьте структуру HTML.")
            return []

        products = []
        for card in product_cards:
            try:
                # Извлекаем название товара
                name_tag = card.find('h3', class_='wd-entities-title')
                name = name_tag.get_text(strip=True) if name_tag else "Неизвестный товар"

                # Извлекаем цену товара
                price_tag = card.find('span', class_='woocommerce-Price-amount amount')
                price_text = price_tag.get_text(strip=True) if price_tag else "0"
                price = float(price_text.replace('руб.', '').replace(',', '.').strip())

                # Извлекаем URL изображения
                image_tag = card.find('img')
                image_url = image_tag['src'] if image_tag else None

                products.append({
                    'name': name,
                    'price': price,
                    'image_url': image_url,
                })
            except Exception as e:
                print(f"Ошибка при парсинге карточки: {e}")
        return products

    def save_image(self, image_url):
        """
        Сохраняет изображение из URL или Base64-кода.
        """
        if not image_url:
            return None

        try:
            # Проверка на Base64-данные
            if image_url.startswith("data:image"):
                # Извлечение типа изображения и данных
                image_type, base64_data = image_url.split(',', 1)
                extension = image_type.split('/')[1].split(';')[0]  # Например, jpg или png
                image_name = f"product_image_{hash(image_url)}.{extension}"
                save_path = os.path.join(settings.MEDIA_ROOT, 'product_images', image_name)

                # Декодируем и сохраняем изображение
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                with open(save_path, 'wb') as f:
                    f.write(base64.b64decode(base64_data))

                return f'product_images/{image_name}'

            # Если это обычный URL
            if not image_url.startswith(('http://', 'https://')):
                image_url = f"https://lukoff.by{image_url}"

            response = requests.get(image_url)
            response.raise_for_status()

            # Извлекаем имя файла изображения
            image_name = os.path.basename(image_url)
            save_path = os.path.join(settings.MEDIA_ROOT, 'product_images', image_name)

            # Создаём директорию, если её нет
            os.makedirs(os.path.dirname(save_path), exist_ok=True)

            # Сохраняем файл
            with open(save_path, 'wb') as f:
                f.write(response.content)

            # Возвращаем путь относительно MEDIA_ROOT
            return f'product_images/{image_name}'
        except Exception as e:
            print(f"Ошибка при сохранении изображения: {e}")
            return None

    def save_to_database(self):
        """
        Сохраняет данные о товарах в базу данных.
        """
        html = self.fetch_html(self.BASE_URL)
        products = self.parse_page(html)

        for product in products:
            try:
                print(f"Обработка товара: {product['name']}")

                # Сохранение изображения
                image_path = self.save_image(product['image_url'])

                # Сохранение товара в базу данных
                product_obj, created = Product.objects.update_or_create(
                    name=product['name'],
                    defaults={
                        'price': product['price'],
                        'group': 'steel',  # Группа по умолчанию
                        'image': image_path,
                    },
                )
                if created:
                    print(f"Товар '{product['name']}' добавлен в базу.")
                else:
                    print(f"Товар '{product['name']}' обновлен в базе.")
            except Exception as e:
                print(f"Ошибка при сохранении товара '{product['name']}': {e}")



