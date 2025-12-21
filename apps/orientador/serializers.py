from rest_framework.serializers import ModelSerializer
from apps.orientador.models import Orientador  

class OrientadorSerializer(ModelSerializer):
    class Meta:
        model = Orientador
        fields = '__all__'
        
        