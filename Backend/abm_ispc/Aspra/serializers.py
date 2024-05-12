from rest_framework import serializers
from .models import Animal,  Donacion, Refugio
from django.contrib.auth.models import User


# ----------user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user
# ------------------fin_user


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = "__all__"


# class ContactoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Contacto
#         fields = "__all__"


class DonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donacion
        fields = "__all__"

class RefugioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Refugio
        fields = "__all__"