from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status   
from .models import Trabalho
from .serializers import TrabalhoSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from apps.arquivo.models import Arquivo
import hashlib

class CriarTrabalhoView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    def post(self, request):
        
        serializer = TrabalhoSerializer(data=request.data)
        if serializer.is_valid():
            trabalho = serializer.save()
            return Response(
                TrabalhoSerializer(trabalho).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AtualizarTrabalhoView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, trabalho_id):
        try:
            print(request.FILES)
            trabalho = Trabalho.objects.get(id=trabalho_id)

            serializer = TrabalhoSerializer(
                trabalho,
                data=request.data,
                partial=True
            )

            if serializer.is_valid():
                trabalho = serializer.save()

                # 📎 arquivo opcional
                arquivo_file = request.FILES.get('arquivo')

                if arquivo_file:
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

                return Response(
                    TrabalhoSerializer(trabalho).data,
                    status=status.HTTP_200_OK
                )

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Trabalho.DoesNotExist:
            return Response(
                {"detail": "Trabalho não encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

class ListarTrabalhosView(APIView):
    def get(self, request):
        try:
            trabalhos = Trabalho.objects.all()
            serializer = TrabalhoSerializer(trabalhos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    

class FiltrarTrabalhosPeloTituloView(APIView):
    def get(self, request):
        try:
            titulo = request.GET.get('titulo', None)
            if titulo is not None:
                trabalhos = Trabalho.objects.filter(titulo__icontains=titulo)
                serializer = TrabalhoSerializer(trabalhos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Parâmetro 'titulo' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarTrabalhosPeloAnoView(APIView):
    def get(self, request):
        try:
            ano = request.GET.get('ano', None)
            if ano is not None:
                trabalhos = Trabalho.objects.filter(ano_defesa=ano)
                serializer = TrabalhoSerializer(trabalhos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Parâmetro 'ano' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ExcluirTrabalhoView(APIView):
    def delete(self, request, trabalho_id):
        try:
            trabalho = Trabalho.objects.get(id=trabalho_id)
            trabalho.delete()
            return Response({"message": "Trabalho excluído com sucesso."}, status=status.HTTP_204_NO_CONTENT)
        
        except Trabalho.DoesNotExist:
            return Response({"error": "Trabalho não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ObterTrabalhoPeloIdView(APIView):
    def get(self, request, trabalho_id):
        try:
            trabalho = Trabalho.objects.get(id=trabalho_id)
            serializer = TrabalhoSerializer(trabalho)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

