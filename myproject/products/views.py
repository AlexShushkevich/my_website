from rest_framework import generics, permissions, filters
from .models import Product
from .serializers import ProductSerializer
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Список всех товаров
class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.OrderingFilter]
    search_fields = ['name']


# Детали конкретного товара
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]

class ProductListByGroupView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        group = self.kwargs['group']
        return Product.objects.filter(group=group)


