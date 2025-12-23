from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PalavraChave
from .serializers import PalavraChaveSerializer

class CriarPalavraChaveView(APIView):
    def post(self, request):
        try:
            dados_palavra_chave = request.data.get('dados_palavra_chave')
            serializer = PalavraChaveSerializer(data=dados_palavra_chave, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarPalavraChaveView(APIView):  
    def patch(self, request, palavra_chave_id):
        try:
            palavra_chave = PalavraChave.objects.get(id=palavra_chave_id)
        
            dados_palavra_chave = request.data.get('dados_palavra_chave_atualizados')
            serializer = PalavraChaveSerializer(palavra_chave, data=dados_palavra_chave, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
        
        except PalavraChave.DoesNotExist:
            return Response({"error": "Palavra-chave não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ListarPalavrasChaveView(APIView):
    def get(self, request):
        try:
            palavras_chave = PalavraChave.objects.all()
            serializer = PalavraChaveSerializer(palavras_chave, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarPalavraChavePeloTermoView(APIView):
    def get(self, request):
        try:
            termo = request.GET.get('termo', None)
            if termo is not None:
                palavras_chave = PalavraChave.objects.filter(termo__icontains=termo)
                serializer = PalavraChaveSerializer(palavras_chave, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Parâmetro 'termo' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)     

class ExcluirPalavraChaveView(APIView):
    def delete(self, request, palavra_chave_id):
        try:
            palavra_chave = PalavraChave.objects.get(id=palavra_chave_id)
            palavra_chave.delete()
            return Response({"message": "Palavra-chave excluída com sucesso!"}, status=status.HTTP_200_OK)
        
        except PalavraChave.DoesNotExist:
            return Response({"error": "Palavra-chave não encontrada."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
       
        
