import rest_auth.serializers
from rest_framework import serializers
from .models import Address, Profile

class LoginSerializer(rest_auth.serializers.LoginSerializer):
    def get_fields(self):
        fields = super(LoginSerializer, self).get_fields()
        # fields['email'] = fields['username']
        del fields['username']
        return fields

    def validate(self, attrs):
        attrs['username'] = attrs['email']
        # del attrs['email']
        return super(LoginSerializer, self).validate(attrs)


class TokenSerializer(rest_auth.serializers.TokenSerializer):
    """
    Serializer for Token model.
    """
    has_profile = serializers.SerializerMethodField()

    class Meta:
        model = rest_auth.serializers.TokenModel
        fields = ('key', 'has_profile')

    def get_has_profile(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        
        if user:
            return Profile.objects.filter(user=user).exists()
        return False


class JWTSerializer(rest_auth.serializers.JWTSerializer):
    """
    Serializer for JWT authentication.
    """
    has_profile = serializers.SerializerMethodField()

    def get_has_profile(self, obj):
        user = None
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            user = request.user
        
        if user:
            return Profile.objects.filter(user=user).exists()
        return False


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class UserSerializer(rest_auth.serializers.UserDetailsSerializer):
    profile = serializers.SerializerMethodField()
    class Meta(rest_auth.serializers.UserDetailsSerializer.Meta):
        fields = ('pk', 'username', 'email', 'first_name', 'last_name', 'profile')
        read_only_fields = ('email', )

    def get_profile(self, obj):
        try:
            data = ProfileSerializer(obj.profile).data
            return data
        except Exception as e:
            print(str(e))
            return ''


