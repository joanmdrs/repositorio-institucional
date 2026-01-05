from rest_framework import serializers
from .models import Usuario


class UsuarioReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'is_staff', 'is_superuser']

class UsuarioWriteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'groups']

    def create(self, validated_data):
        groups = validated_data.pop('groups', [])
        user = Usuario.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password']
        )
        user.groups.set(groups) 
        return user