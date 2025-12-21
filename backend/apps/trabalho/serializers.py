from rest_framework.serializers import ModelSerializer
from apps.trabalho.models import Trabalho   

class TrabalhoSerializer(ModelSerializer):
    class Meta:
        model = Trabalho
        fields = '__all__'  
        