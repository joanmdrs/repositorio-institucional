from rest_framework import serializers
from .models import Trabalho
from apps.arquivo.models import Arquivo
from apps.palavra_chave.models import PalavraChave
from apps.arquivo.serializers import ArquivoSerializer

import hashlib

class TrabalhoBaseSerializer(serializers.ModelSerializer):
    palavras_chave = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=PalavraChave.objects.all(),
        required=False
    )

    ano_defesa = serializers.IntegerField(read_only=True)

    class Meta:
        model = Trabalho
        fields = '__all__'

        
class TrabalhoReadSerializer(TrabalhoBaseSerializer):
    arquivos = ArquivoSerializer(many=True, read_only=True)

class TrabalhoWriteSerializer(TrabalhoBaseSerializer):
    arquivo = serializers.FileField(required=False, write_only=True)

    def create(self, validated_data):
        palavras = validated_data.pop('palavras_chave', [])
        arquivo_file = validated_data.pop('arquivo', None)

        data_defesa = validated_data.get('data_defesa')
        if data_defesa:
            validated_data['ano_defesa'] = data_defesa.year

        trabalho = Trabalho.objects.create(**validated_data)
        trabalho.palavras_chave.set(palavras)

        if arquivo_file:
            self._criar_arquivo(trabalho, arquivo_file)

        return trabalho

    def update(self, instance, validated_data):
        palavras = validated_data.pop('palavras_chave', None)
        arquivo_file = validated_data.pop('arquivo', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if instance.data_defesa:
            instance.ano_defesa = instance.data_defesa.year

        instance.save()

        if palavras is not None:
            instance.palavras_chave.set(palavras)

        if arquivo_file:
            self._criar_arquivo(instance, arquivo_file)

        return instance

    def _criar_arquivo(self, trabalho, arquivo_file):
        hash_sha256 = hashlib.sha256()
        for chunk in arquivo_file.chunks():
            hash_sha256.update(chunk)
        checksum = hash_sha256.hexdigest()

        Arquivo.objects.create(
            trabalho=trabalho,
            arquivo=arquivo_file,
            nome=arquivo_file.name,
            tipo=arquivo_file.content_type,
            tamanho=arquivo_file.size,
            checksum=checksum
        )
