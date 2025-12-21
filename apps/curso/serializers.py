from rest_framework.serializers import ModelSerializer
from apps.curso.models import Curso

class CursosSerializer(ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'
        
        