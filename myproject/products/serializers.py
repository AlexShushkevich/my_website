from rest_framework import serializers
from .models import Product, Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)  # Включаем данные продукта в сериализацию

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']  # Включаем продукт и количество


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # Сериализуем элементы корзины

    class Meta:
        model = Cart
        fields = ['id', 'items', 'created_at']  # Включаем идентификатор корзины, элементы и дату создания
