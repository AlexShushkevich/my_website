from django.urls import path
from .views import ProductListView, ProductDetailView, ProductListByGroupView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('products/group/<str:group>/', ProductListByGroupView.as_view(), name='product-list-by-group'),
]