from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status   
from .models import Trabalho
from .serializers import TrabalhoSerializer

class CriarTrabalhoView(APIView):
    def post(self, request):
        try:
            dados_trabalho = request.data.get('dados_trabalho')
            serializer = TrabalhoSerializer(data=dados_trabalho, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarTrabalhoView(APIView):  
    def patch(self, request, trabalho_id):
        try:
            trabalho = Trabalho.objects.get(id=trabalho_id)
        
            dados_trabalho = request.data.get('dados_trabalho_atualizados')
            serializer = TrabalhoSerializer(trabalho, data=dados_trabalho, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
        
        except Trabalho.DoesNotExist:
            return Response({"error": "Trabalho não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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
        
class FiltrarTrabalhosPeloNomeAutorView(APIView):
    def get(self, request):
        try:
            autor_nome = request.GET.get('autor_nome', None)
            if autor_nome is not None: 
                trabalhos = Trabalho.objects.filter(autores__nome_completo__icontains=autor_nome)
                serializer = TrabalhoSerializer(trabalhos, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Parâmetro 'autor_nome' é obrigatório."}, status=status.HTTP_400_BAD_REQUEST)
        
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
        

