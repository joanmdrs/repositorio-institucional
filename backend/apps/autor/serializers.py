from .models import Autor
from  rest_framework import serializers
class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = '__all__'