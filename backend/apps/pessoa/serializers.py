from rest_framework.serializers import ModelSerializer
from .models import Pessoa

class PessoaSerializer(ModelSerializer):
     class Meta:
        model = Pessoa
        fields = '__all__'