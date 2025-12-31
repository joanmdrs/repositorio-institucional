from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PessoaSerializer
from .models import Pessoa

class CriarPessoaView(APIView):
    def post(self, request):
        try:
            pessoa = PessoaSerializer(data=request.data, many=False)
            if pessoa.is_valid():
                pessoa.save()
                return Response({"message": "Pessoa criada com sucesso!"}, status=status.HTTP_200_OK)
            else:
                return Response(pessoa.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AtualizarPessoaView(APIView):
    def patch(self, request, pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            
            serializer = PessoaSerializer(pessoa, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Pessoa atualizada com sucesso!"}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Pessoa.DoesNotExist:
            return Response({"error": "Pessoa não encontrada"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarPessoasView(APIView):
    def get(self, request):
        try:
            pessoas = Pessoa.objects.all()
            serializer = PessoaSerializer(pessoas)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ObterPessoaPeloIdView(APIView):
    def get(self, request, pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            serializer = PessoaSerializer(pessoa, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Pessoa.DoesNotExist:
            return Response({"error": "Pessoa não encontrada"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirPessoaView(APIView):
    def get(self, request, pessoa_id):
        try:
            pessoa = Pessoa.objects.get(id=pessoa_id)
            pessoa.delete()    
            return Response({"message": "Pessoa excluída com sucesso!"}, status=status.HTTP_200_OK)
        
        except Pessoa.DoesNotExist:
            return Response({"error": "Pessoa não encontrada"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)