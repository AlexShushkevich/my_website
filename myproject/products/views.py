from rest_framework import generics, permissions
from .models import Product
from .serializers import ProductSerializer

# Список всех товаров
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]  # Можно настроить права доступа по необходимости

# Детали конкретного товара
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductListByGroupView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        group = self.kwargs['group']
        return Product.objects.filter(group=group)