from rest_framework.serializers import ModelSerializer
from apps.arquivo.models import Arquivo 

class ArquivoSerializer(ModelSerializer):
    class Meta:
        model = Arquivo
        fields = '__all__'  