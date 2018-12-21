
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from food import views

app_name = 'food'
urlpatterns = [
    url(r'^$', views.FoodCreatListAPIView.as_view(), name='food-list-create'),
    url(r'^(?P<pk>\d+)/$', views.FoodUpdateAPIView.as_view(), name='food-update-delete-retrieve'),
    url(r'^food_variant/$', views.FoodVariantCreatListAPIView.as_view(), name='food-variant-list-create'),
    url(r'^food_variant/(?P<pk>\d+)/$', views.FoodVariantUpdateAPIView.as_view(), name='food-variant-update-delete-retrieve'),
    url(r'^product_type/$', views.ProductTypeCreatListAPIView.as_view(), name='product-type-list-create'),
    url(r'^product_type/(?P<pk>\d+)/$', views.ProductTypeUpdateAPIView.as_view(), name='product-type-update-delete-retrieve'),
    url(r'^attribute/$', views.ProductAttributeCreatListAPIView.as_view(), name='product-attribute-list-create'),
    url(r'^attribute/(?P<pk>\d+)/$', views.ProductAttributeUpdateAPIView.as_view(), name='product-attribute-update-delete-retrieve'),
    url(r'^categories/$', views.CategoryListView.as_view(), name='category-list')
]

urlpatterns = format_suffix_patterns(urlpatterns)