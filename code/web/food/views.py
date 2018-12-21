import logging

from rest_framework import generics
from rest_framework import permissions

from .models import Food, FoodImage, FoodVariant, ProductAttribute, ProductType , Category
from .serializers import FoodSerializer, FoodImageSerializer, FoodVariantSerializer, ProductAttributeSerializer,\
    ProductTypeSerializer, CategorySerializer


class FoodCreatListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FoodSerializer

    def get_queryset(self):
        return Food.objects.filter(owner=self.request.user)


class FoodUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FoodSerializer
    queryset = Food.objects.all()


class FoodVariantCreatListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FoodVariantSerializer

    def get_queryset(self):
        return FoodVariant.objects.filter(owner=self.request.user)


class FoodVariantUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = FoodVariantSerializer
    queryset = FoodVariant.objects.all()


class ProductTypeCreatListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductTypeSerializer
    
    def get_queryset(self):
        return ProductType.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductTypeUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductTypeSerializer
    queryset = ProductType.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class ProductAttributeCreatListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductAttributeSerializer
    
    def get_queryset(self):
        return ProductAttribute.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ProductAttributeUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView, generics.RetrieveAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProductAttributeSerializer
    queryset = ProductAttribute.objects.all()

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class CategoryListView(generics.ListAPIView):
    """
    get all categories

    """
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    queryset = Category.objects.all()
