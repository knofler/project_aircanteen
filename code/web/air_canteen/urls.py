"""air_canteen URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path

from rest_auth.registration.views import VerifyEmailView, RegisterView
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='AirCanteen API', url='/api/docs')
from rest_framework.documentation import include_docs_urls

urlpatterns = [
    path(r'api/docs/core', include_docs_urls(title='Aircanteen API')),
    path('api/docs', schema_view),
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_auth.urls')),
    # path('api/registration/', include('rest_auth.registration.urls')),
    path('api/registration/', RegisterView.as_view(), name='account_signup'),
    re_path(r'^api/registration/account-confirm-email/', VerifyEmailView.as_view(),
        name='account_email_verification_sent'),
    re_path(r'^api/registration/account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(),
        name='account_confirm_email'),
    path('api/profile/', include('userprofile.urls', namespace='userprofile')),
    path('api/food/', include('food.urls', namespace='food')),
    path('accounts/', include('allauth.urls'), name='socialaccount_signup')
]
