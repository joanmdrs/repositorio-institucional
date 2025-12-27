from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Curso
from .serializers import CursoSerializer 

class CriarCursoView(APIView):
    def post(self, request):
        try:
            dados_curso = request.data.get('dados_curso')
            serializer = CursoSerializer(data=dados_curso, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarCursosView(APIView):
    def get(self, request):
        try:
            cursos = Curso.objects.all()
            serializer = CursoSerializer(cursos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarCursoView(APIView):  
    def patch(self, request, curso_id):
        try:
            curso = Curso.objects.get(id=curso_id)
        
            dados_curso = request.data.get('dados_curso_atualizados')
            serializer = CursoSerializer(curso, data=dados_curso, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
        
        except Curso.DoesNotExist:
            return Response({"error": "Curso não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirCursoView(APIView):
    def delete(self, request, curso_id):
        try:
            curso = Curso.objects.get(id=curso_id)
            curso.delete()
            return Response({"message": "Curso excluído com sucesso!"}, status=status.HTTP_200_OK)
        
        except Curso.DoesNotExist:
            return Response({"error": "Curso não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class BuscarCursoPeloNomeView(APIView):
    def get(self, request):
        try:
            nome_curso = request.GET.get('nome_curso')
            cursos = Curso.objects.filter(nome__icontains=nome_curso)
            serializer = CursoSerializer(cursos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ObterCursoPeloIdView(APIView):
    def get(self, request, curso_id):
        try:
            curso = Curso.objects.get(id=curso_id)
            serializer = CursoSerializer(curso)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Curso.DoesNotExist:
            return Response({"error": "Curso não encontrado."}, status=status.HTTP_400_BAD_REQUEST)          
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

       