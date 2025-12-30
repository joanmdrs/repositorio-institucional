from rest_framework.serializers import ModelSerializer
from apps.arquivo.models import Arquivo 
from rest_framework import serializers

class ArquivoSerializer(ModelSerializer):
    trabalho_titulo = serializers.SerializerMethodField()


    class Meta:
        model = Arquivo
        fields = [
            "id",
            "nome",
            "arquivo",
            "tipo",
            "tamanho",
            "checksum",
            "trabalho",
            "trabalho_titulo",
            "criado_em",
        ]
    
    def get_trabalho_titulo(self, obj):
        if obj.trabalho:
            return obj.trabalho.titulo
        return None  
