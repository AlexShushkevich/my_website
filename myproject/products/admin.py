from django.contrib import admin
from .models import Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1  # Количество дополнительных полей для добавления изображений

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'group')
    inlines = [ProductImageInline]

admin.site.register(Product, ProductAdmin)