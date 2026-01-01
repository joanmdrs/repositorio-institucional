from rest_framework import serializers
from .models import Trabalho
from apps.arquivo.models import Arquivo
from apps.palavra_chave.models import PalavraChave
from apps.arquivo.serializers import ArquivoSerializer

import hashlib

class TrabalhoSerializer(serializers.ModelSerializer):
    
    palavras_chave = serializers.PrimaryKeyRelatedField(
        many=True, queryset=PalavraChave.objects.all()
    )
    arquivos = ArquivoSerializer(many=True, read_only=True)

    class Meta:
        model = Trabalho
        fields = '__all__'
    
    
    def create(self, validated_data):
        
        palavras = validated_data.pop('palavras_chave')
        arquivo_file = validated_data.pop('arquivo')

        # calcula ano da defesa
        data_defesa = validated_data['data_defesa']
        validated_data['ano_defesa'] = data_defesa.year

        # cria o trabalho
        trabalho = Trabalho.objects.create(**validated_data)
        trabalho.palavras_chave.set(palavras)


        # calcula checksum
        hash_sha256 = hashlib.sha256()
        for chunk in arquivo_file.chunks():
            hash_sha256.update(chunk)
        checksum = hash_sha256.hexdigest()

        # cria o arquivo
        Arquivo.objects.create(
            trabalho=trabalho,
            arquivo=arquivo_file,
            nome=arquivo_file.name,
            tipo=arquivo_file.content_type,
            tamanho=arquivo_file.size,
            checksum=checksum
        )

        return trabalho