import logging
import requests
from django.contrib.auth import get_user_model
from django.urls import reverse
from allauth.socialaccount.helpers import complete_social_login
from allauth.socialaccount.models import SocialApp, SocialToken, SocialLogin as SLogin
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount import providers
from allauth.socialaccount.providers.facebook.provider import FacebookProvider, GRAPH_API_URL
from allauth.socialaccount.providers.google.provider import GoogleProvider
import coreapi
import coreschema
from rest_framework import status, generics, permissions
from rest_framework.authentication import SessionAuthentication

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.schemas import AutoSchema
from rest_auth.serializers import UserDetailsSerializer
from .models import Address, Profile
from .serializers import AddressSerializer, ProfileSerializer, UserSerializer

logger = logging.getLogger(__name__)
GOOGLE_API_URL = "https://www.googleapis.com/oauth2/v2/userinfo"



def fb_complete_login(request, app, token):
    resp = requests.get(GRAPH_API_URL + '/me',
                        params={'access_token': token.token, 'fields': 'id,name,first_name,last_name,email'})
    resp.raise_for_status()
    extra_data = resp.json()
    unique_name = UserNameCheckAPIView()._do_check(extra_data.get('first_name'),
                                                   extra_data.get('last_name'))
    extra_data['username'] = unique_name
    logger.info(extra_data)
    login = providers.registry \
        .by_id(FacebookProvider.id) \
        .sociallogin_from_response(request, extra_data)
    return login


def google_complete_login(request, app, token):
    resp = requests.get(GOOGLE_API_URL,
                        params={'access_token': token.token})
    resp.raise_for_status()
    extra_data = resp.json()
    unique_name = UserNameCheckAPIView()._do_check(extra_data.get('given_name'),
                                                   extra_data.get('family_name'))
    extra_data['username'] = unique_name
    logger.info(extra_data)
    login = providers.registry \
        .by_id(GoogleProvider.id) \
        .sociallogin_from_response(request, extra_data)
    return login




class EverybodyCanAuthentication(SessionAuthentication):
    def authenticate(self, request):
        return None


class RestFacebookLogin(APIView):
    """
    Login or register a user based on an authentication token coming
    from Facebook.
    Returns user data including session id.
    """

    # this is a public api!!!
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (EverybodyCanAuthentication,)

    def dispatch(self, *args, **kwargs):
        return super(RestFacebookLogin, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        """
        ---
        parameters:
            - name: auth_token
              paramType: query
        """
        try:
            original_request = request._request
            auth_token = request.GET.get('auth_token', '')

            # Find the token matching the passed Auth token
            app = SocialApp.objects.get(provider='facebook')
            fb_auth_token = SocialToken(app=app, token=auth_token)
            logger.info(str(fb_auth_token))

            # check token against facebook
            login = fb_complete_login(original_request, app, fb_auth_token)
            login.token = fb_auth_token
            login.state = SLogin.state_from_request(original_request)

            logger.info(login)
            logger.info(login.user)

            if login.user:
                if not login.user.email:
                    return Response(
                        status=status.HTTP_400_BAD_REQUEST,
                        data={
                            'non_field_errors': ['You do not have any email address associated with your facebook '
                                                 'account. '
                                      'Please sign up through Registration']
                        }
                    )

            # add or update the user into users table
            try:
                social_login = complete_social_login(original_request, login)
            except Exception as exc:
                logger.info(str(exc))
                url = reverse('userprofile:facebook-login-signup')
                url = request.scheme + '://' + request.get_host() + url + '?auth_token=' + str(fb_auth_token)
                logger.info(url)
                resp = requests.get(url)

                return Response(resp.json(), status=resp.status_code)

            logger.info(social_login)
            logger.info(social_login.__getitem__('location'))

            if social_login.__getitem__('location') not in ['/accounts/profile/']:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={
                        'non_field_errors': ['An MDM account has already been created using this email.']
                    }
                )
            elif 'signup' in social_login.__getitem__('location'):
                pass

            # Create or fetch the session id for this user
            from rest_auth.utils import jwt_encode
            # token, _ = Token.objects.get_or_create(user=original_request.user)
            token = jwt_encode(original_request.user)
            logger.info(token)

            # if we get here we've succeeded
            kwargs['context'] = {
                'request': request
            }
            serializer = UserDetailsSerializer(instance=original_request.user, **kwargs)

            data = {
                'token': token,
                'has_profile': Profile.objects.filter(user=original_request.user).exists()
            }
            serializer_data = serializer.data.copy()

            serializer_data.update(data)
            return Response(
                status=200,
                data=serializer_data
            )

        except Exception as exc:
            logger.info(str(exc))
            return Response(status=401, data={
                'non_field_errors': ['Bad Access Token'],
            })


class RestGoogleLogin(APIView):
    """
    Login or register a user based on an authentication token coming
    from Google.
    Returns user data including session id.
    """
    # this is a public api!!!
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (EverybodyCanAuthentication,)

    def dispatch(self, *args, **kwargs):
        return super(RestGoogleLogin, self).dispatch(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        """
        ---
        parameters:
            - name: auth_token
              paramType: query
        """
        try:
            original_request = request._request
            auth_token = request.GET.get('auth_token', '')

            # Find the token matching the passed Auth token
            app = SocialApp.objects.get(provider='google')
            google_auth_token = SocialToken(app=app, token=auth_token)
            logger.info(str(google_auth_token))

            # check token against google
            login = google_complete_login(original_request, app, google_auth_token)
            login.token = google_auth_token
            login.state = SLogin.state_from_request(original_request)

            logger.info(login)
            logger.info(login.user)

            if login.user:
                if not login.user.email:
                    return Response(
                        status=status.HTTP_400_BAD_REQUEST,
                        data={
                            'non_field_errors': ['You do not have any email address associated with your google '
                                                 'account. '
                                      'Please sign up through Registration']
                        }
                    )

            # add or update the user into users table
            try:
                social_login = complete_social_login(original_request, login)
            except Exception as exc:
                logger.info(str(exc))
                url = reverse('userprofile:google-login-signup')
                url = request.scheme + '://' + request.get_host() + url + '?auth_token=' + str(google_auth_token)
                logger.info(url)
                resp = requests.get(url)

                return Response(resp.json(), status=resp.status_code)

            logger.info(social_login)
            logger.info(social_login.__getitem__('location'))

            if social_login.__getitem__('location') not in ['/accounts/profile/']:
                return Response(
                    status=status.HTTP_400_BAD_REQUEST,
                    data={
                        'non_field_errors': ['An AirCanteen account has already been created using this email.']
                    }
                )
            elif 'signup' in social_login.__getitem__('location'):
                pass

            # Create or fetch the session id for this user
            from rest_auth.utils import jwt_encode
            # token, _ = Token.objects.get_or_create(user=original_request.user)
            token = jwt_encode(original_request.user)
            logger.info(token)

            # if we get here we've succeeded
            kwargs['context'] = {
                'request': request
            }
            serializer = UserDetailsSerializer(instance=original_request.user, **kwargs)

            data = {
                'token': token,
                'has_profile': Profile.objects.filter(user=original_request.user).exists()
            }
            serializer_data = serializer.data.copy()

            serializer_data.update(data)
            return Response(
                status=200,
                data=serializer_data
            )

        except Exception as exc:
            logger.info(str(exc))
            return Response(status=401, data={
                'non_field_errors': ['Bad Access Token'],
            })


class UserNameCheckAPIView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        """
        Check username is exists or not.
        ---
        parameters:
            - name: first_name
              required: true
            - name: last_name
              required: true
        """
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        if (first_name or last_name) is None:
            return Response({"msg": "Both names are required"}, status=status.HTTP_400_BAD_REQUEST)

        unique_name = self._do_check(first_name, last_name)

        return Response({"username": unique_name}, status=status.HTTP_200_OK)

    def _do_check(self, first_name, last_name):
        name = first_name.lower() + last_name.lower()

        try:
            name_count = get_user_model().objects.filter(username__startswith=first_name.lower()).count()
            if name_count:
                new_name = name + str(name_count)
                try:
                    if get_user_model().objects.filter(username=new_name).exists():
                        return name + str(name_count + 1)
                    else:
                        return new_name
                except get_user_model().DoesNotExist:
                    return new_name
            else:
                return name
        except get_user_model().DoesNotExist:
            pass

        return name


class ProfileCreateAPIView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    # serializer_class = ProfileSerializer

    schema = AutoSchema(
        manual_fields=[
            coreapi.Field("user", required=True, schema=coreschema.Integer(description="Foreign Key, should be user ID.")),
            coreapi.Field("user_type", required=True),
            coreapi.Field("avatar", required=False, schema=coreschema.String(description='Upload profile picutre.')),
            coreapi.Field("phone", required=True),
            coreapi.Field("lat", required=True),
            coreapi.Field("lng", required=True),
            coreapi.Field("address", required=True),
            coreapi.Field("gender", required=False, schema=coreschema.String(description='Male or Female')),
            coreapi.Field("description", required=False, schema=coreschema.String(description='Like self bio')),
            coreapi.Field("dob", required=False, schema=coreschema.String(description='Date of Birth: Date field')),
            coreapi.Field("specialization", required=False, schema=coreschema.String(description='This is particularly for Chef. In which food items he/she expertise.')),
            coreapi.Field("age", required=False, schema=coreschema.Integer(description='User age')),
            coreapi.Field("national_id", required=False, schema=coreschema.String(description='User National ID')),
            coreapi.Field("driving_license", required=False, schema=coreschema.String(description='Especially for Delivery person.')),
            coreapi.Field("license_plate", required=False, schema=coreschema.String(description='Especially for Delivery person.')),
            coreapi.Field("delivery_method", required=False, schema=coreschema.Integer(description='Especially for Delivery person. "0"-Walk, "1"-Bicycle, "2"-Motorcycle')),
        ]
    )

    def post(self, request, *args, **kwargs):
        # print(request.data)
        address_data = request.data.copy()
        serializer = ProfileSerializer(data=request.data)
        address_serializer = AddressSerializer(data=address_data)
        if serializer.is_valid():
            profile = serializer.save()

            if address_serializer.is_valid():
                address_serializer.save(profile=profile)
                new_serializer = serializer.data.copy()
                new_serializer.update(address_serializer.data)
                return Response(new_serializer, status=status.HTTP_201_CREATED)
            else:
                # print(address_serializer.errors)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class UserDetailAPIView(APIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            profile = None

        if profile:
            serializer = self.serializer_class(request.user)
            return Response(serializer.data)
        
        return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class UserListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        self.usertype = int(self.request.GET.get('type', 0))
        if self.usertype:
            queryset = get_user_model().objects.filter(profile__user_type=self.usertype)
        else:
            queryset = get_user_model().objects.all()
        return queryset


class AddressCreatListAPIView(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AddressSerializer

    def get_queryset(self):
        return Address.objects.filter(profile=self.request.user.profile)

    def perform_create(self, serializer):
        serializer.save(profile=self.request.user.profile)


class AddressUpdateAPIView(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = AddressSerializer
    queryset = Address.objects.all()

    def perform_update(self, serializer):
        serializer.save(profile=self.request.user.profile)
