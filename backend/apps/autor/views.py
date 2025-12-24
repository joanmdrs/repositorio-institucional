from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AutorSerializer
from .models import Autor


class CriarAutorView(APIView):
    def post(self, request):
        try:
            dados_autor = request.data.get('dados_autor')
            
            autor = AutorSerializer(data=dados_autor, many=False)
            if autor.is_valid():
                autor.save()
                return Response({"message": "Autor criado com sucesso!"}, status=status.HTTP_201_CREATED)
            else:
                return Response(autor.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarAutoresView(APIView):
    def get(self, request):
        try:
            autores = Autor.objects.all()
            serializer = AutorSerializer(autores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarAutorView(APIView):
    def patch(self, request, autor_id):
        try:
            dados_autor_atualizados = request.data.get('dados_autor_atualizados')
            instancia_autor = Autor.objects.get(id=autor_id)
            
            autor = AutorSerializer(instancia_autor, data=dados_autor_atualizados, partial=True)
            if autor.is_valid():
                autor.save()
                return Response({"message": "Autor atualizado com sucesso!"}, status=status.HTTP_200_OK)
            else:
                return Response(autor.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Autor.DoesNotExist:
            return Response({"error": "Autor não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirAutorView(APIView):
    def delete(self, request, autor_id):
        try:
            instancia_autor = Autor.objects.get(id=autor_id)
            instancia_autor.delete()    
            return Response({"message": "Autor excluído com sucesso!"}, status=status.HTTP_200_OK)
        
        except Autor.DoesNotExist:
            return Response({"error": "Autor não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarAutorPeloNomeView(APIView):
    def get(self, request, nome_autor):
        try:
            autores = Autor.objects.filter(nome__icontains=nome_autor)
            serializer = AutorSerializer(autores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarAutorPeloIdView(APIView):
    def get(self, request, autor_id):
        try:
            autor = Autor.objects.get(id=autor_id)
            serializer = AutorSerializer(autor, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Autor.DoesNotExist:
            return Response({"error": "Autor não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)