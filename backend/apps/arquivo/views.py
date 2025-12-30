from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Arquivo
from .serializers import ArquivoSerializer
import hashlib
from django.http import FileResponse

class CriarArquivoView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        file = request.FILES.get('arquivo')

        if not file:
            return Response(
                {"error": "Arquivo é obrigatório."},
                status=status.HTTP_400_BAD_REQUEST
            )

        checksum = hashlib.sha256(file.read()).hexdigest()
        file.seek(0)
        data = request.data.copy()
        data['nome'] = file.name
        data['tipo'] = file.content_type
        data['tamanho'] = file.size
        data['checksum'] = checksum

        serializer = ArquivoSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ListarArquivosView(APIView):
    def get(self, request):
        try:
            arquivos = Arquivo.objects.all()
            serializer = ArquivoSerializer(arquivos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)  
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )      
            
class ExcluirArquivoView(APIView):
    def delete(self, request, arquivo_id):
        try:
            arquivo = Arquivo.objects.get(id=arquivo_id)
            arquivo.delete()
            return Response({"message": "Arquivo excluído com sucesso."}, status=status.HTTP_204_NO_CONTENT)
        except Arquivo.DoesNotExist:
            return Response(
                {"error": "Arquivo não encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )   
            
        
class DownloadArquivoView(APIView):
    def get(self, request, arquivo_id):
        arquivo = Arquivo.objects.get(id=arquivo_id)
        return FileResponse(
            arquivo.arquivo.open(),
            as_attachment=True,
            filename=arquivo.arquivo.name
        )
