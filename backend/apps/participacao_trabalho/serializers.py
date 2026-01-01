from rest_framework.serializers import ModelSerializer
from .models import ParticipacaoTrabalho

class ParticipacaoTrabalhoSerializer(ModelSerializer):
    
    class Meta:
        model = ParticipacaoTrabalho
        fields = '__all__'