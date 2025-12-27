from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Departamento
from .serializers import DepartamentoSerializer

class CriarDepartamentoView(APIView):
    def post(self, request):
        try:
            dados_departamento = request.data.get('dados_departamento')
            serializer = DepartamentoSerializer(data=dados_departamento, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
class ListarDepartamentosView(APIView):
    def get(self, request):
        try:
            departamentos = Departamento.objects.all()
            serializer = DepartamentoSerializer(departamentos, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class AtualizarDepartamentoView(APIView):
    def patch(self, request, departamento_id):
        try:
            departamento = Departamento.objects.get(id=departamento_id)
        
            dados_departamento = request.data.get('dados_departamento_atualizados')
            serializer = DepartamentoSerializer(departamento, data=dados_departamento, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      
        
        except Departamento.DoesNotExist:
            return Response({"error": "Departamento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
        
class ExcluirDepartamentoView(APIView):
    def delete(self, request, departamento_id):
        try:
            departamento = Departamento.objects.get(id=departamento_id)
            departamento.delete()
            return Response({"message": "Departamento excluído com sucesso!"}, status=status.HTTP_200_OK)
        
        except Departamento.DoesNotExist:
            return Response({"error": "Departamento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class BuscarDepartamentoPeloNomeView(APIView):
    def get(self, request):
        try:
            departamento_nome = request.GET.get('departamento_nome')

            departamentos = Departamento.objects.filter(nome__icontains=departamento_nome)

            serializer = DepartamentoSerializer(departamentos, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class ObterDepartamentoPeloIdView(APIView):
    def get(self, request, departamento_id):
        try:
            departamento = Departamento.objects.get(id=departamento_id)
            serializer = DepartamentoSerializer(departamento)
            
        except Departamento.DoesNotExist:
            return Response({"error": "Departamento não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

    
