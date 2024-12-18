import os
import requests
import base64
from io import BytesIO
from PIL import Image
from bs4 import BeautifulSoup
from products.models import Product
from django.conf import settings


class KupilukiParser:
    BASE_URL = "https://kupiluki.by/catalog/lyuki_pod_plitku/lyuki_evrostandart/"

    HEADERS = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    }

    def fetch_html(self, url):
        try:
            response = requests.get(url, headers=self.HEADERS)
            response.raise_for_status()
            return response.text
        except requests.RequestException as e:
            print(f"Ошибка при загрузке страницы {url}: {e}")
            return ""

    def parse_page(self, html):
        soup = BeautifulSoup(html, 'lxml')
        product_cards = soup.find_all('div', class_='item_block js-notice-block grid-list__item grid-list-border-outer')

        if not product_cards:
            print("Не найдены карточки товаров. Проверьте структуру HTML.")
            return []

        products = []
        for card in product_cards:
            try:
                # Извлекаем название товара
                name_tag = card.find('div', class_='item-title')
                name = name_tag.get_text(strip=True) if name_tag else "Неизвестный товар"

                # Извлекаем цену товара
                price_tag = card.find('span', class_='price_value')
                price_text = price_tag.get_text(strip=True) if price_tag else "0"
                price = float(price_text.replace('руб.', '').replace(',', '.').strip())

                # Извлекаем URL изображения
                image_tag = card.find('img')
                image_url = image_tag['src'] if image_tag else None

                # Извлекаем ссылку на карточку товара
                detail_link_tag = card.find('a', class_='thumb shine')
                detail_link = detail_link_tag['href'] if detail_link_tag else None

                products.append({
                    'name': name,
                    'price': price,
                    'image_url': image_url,
                    'detail_link': detail_link,
                })
            except Exception as e:
                print(f"Ошибка при парсинге карточки: {e}")
        return products

    def parse_product_detail(self, detail_url):
        if not detail_url.startswith(('http://', 'https://')):
            detail_url = f"https://kupiluki.by{detail_url}"

        html = self.fetch_html(detail_url)
        soup = BeautifulSoup(html, 'lxml')

        description_tag = soup.find('div', class_='descr-outer-wrapper')
        description = description_tag.get_text(strip=True) if description_tag else "Описание отсутствует"
        return description

    def save_image(self, image_url):
        if not image_url:
            return None

        try:
            # Если это встроенный Base64-URL
            if image_url.startswith("data:image"):
                image_type, base64_data = image_url.split(',', 1)
                extension = image_type.split('/')[1].split(';')[0]
                image_name = f"product_image_{hash(image_url)}.{extension}"
                save_path = os.path.join(settings.MEDIA_ROOT, 'product_images', image_name)

                # Создаём директорию, если её нет
                os.makedirs(os.path.dirname(save_path), exist_ok=True)

                # Декодируем и уменьшаем изображение
                image_data = base64.b64decode(base64_data)
                img = Image.open(BytesIO(image_data))
                img = img.convert("RGB")
                img.thumbnail((100, 100))
                img.save(save_path, format="JPEG", quality=85)

                return f'product_images/{image_name}'

            # Если это обычный URL
            if not image_url.startswith(('http://', 'https://')):
                image_url = f"https://kupiluki.by{image_url}"

            response = requests.get(image_url)
            response.raise_for_status()

            # Извлекаем имя файла изображения
            image_name = os.path.basename(image_url)
            save_path = os.path.join(settings.MEDIA_ROOT, 'product_images', image_name)

            # Создаём директорию, если её нет
            os.makedirs(os.path.dirname(save_path), exist_ok=True)



            # Возвращаем путь относительно MEDIA_ROOT
            return f'product_images/{image_name}'
        except Exception as e:
            print(f"Ошибка при сохранении изображения: {e}")
            return None

    def save_to_database(self):

        html = self.fetch_html(self.BASE_URL)
        products = self.parse_page(html)

        for product in products:
            try:
                print(f"Обработка товара: {product['name']}")

                # Парсинг описания из карточки товара
                description = self.parse_product_detail(product['detail_link'])

                # Сохранение изображения
                image_path = self.save_image(product['image_url'])

                # Сохранение товара в базу данных
                product_obj, created = Product.objects.update_or_create(
                    name=product['name'],
                    defaults={
                        'price': product['price'],
                        'group': 'eurostandard',
                        'image': image_path,
                        'description': description,
                    },
                )
                if created:
                    print(f"Товар '{product['name']}' добавлен в базу.")
                else:
                    print(f"Товар '{product['name']}' обновлен в базе.")
            except Exception as e:
                print(f"Ошибка при сохранении товара '{product['name']}': {e}")
