from django.db import models
from django.conf import settings


class Product(models.Model):
    GROUP_CHOICES = [
        ('eurostandard', 'Евростандарт'),
        ('diplomat', 'Дипломат'),
        ('pogrebok', 'Погребок'),
        ('pogrebok-mini', 'Погребок мини'),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(default="Описание отсутствует")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    group = models.CharField(max_length=50, choices=GROUP_CHOICES, default='NONE')
    image = models.ImageField(upload_to='product_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name



class Cart(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="cart"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        return self.quantity * self.product.price

class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/additional/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='additional_images')

    def __str__(self):
        return f"Доп. изображение для {self.product.name}"