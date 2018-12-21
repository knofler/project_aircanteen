
from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from userprofile import views

app_name = 'userprofile'
urlpatterns = [
    url(r'^facebook-signup/$', views.RestFacebookLogin.as_view(), name='facebook-login-signup'),
    url(r'^google-signup/$', views.RestGoogleLogin.as_view(), name='google-login-signup'),
    url(r'^create/$', views.ProfileCreateAPIView.as_view(), name='profile-create'),
    url(r'^detail/$', views.UserDetailAPIView.as_view(), name='profile-detail'),
    url(r'^lists/$', views.UserListAPIView.as_view(), name='user-list'),
    url(r'^update_delete/(?P<pk>\d+)/$', views.ProfileUpdateAPIView.as_view(), name='profile-update-delete'),
    url(r'^address/create/$', views.AddressCreatListAPIView.as_view(), name='address-create'),
    url(r'^address/update_delete/(?P<pk>\d+)/$', views.AddressUpdateAPIView.as_view(), name='address-update-delete'),
    url(r'^address/lists/$', views.AddressCreatListAPIView.as_view(), name='address-list'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
