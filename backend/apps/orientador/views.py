from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import OrientadorSerializer
from .models import Orientador

class CriarOrientadorView(APIView):
    def post(self, request):
        try:
            dados_orientador = request.data.get('dados_orientador')

            orientador = OrientadorSerializer(data=dados_orientador, many=False)
            if orientador.is_valid():
                orientador.save()
                return Response({"message": "Orientador criado com sucesso!"}, status=status.HTTP_201_CREATED)
            else:
                return Response(orientador.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class ListarOrientadoresView(APIView):
    def get(self, request):
        try:
            orientadores = Orientador.objects.all()
            serializer = OrientadorSerializer(orientadores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AtualizarOrientadorView(APIView):
    def patch(self, request, orientador_id):
        try:
            dados_orientador_atualizados = request.data.get('dados_orientador_atualizados')
            instancia_orientador = Orientador.objects.get(id=orientador_id)
            
            orientador = OrientadorSerializer(instancia_orientador, data=dados_orientador_atualizados, partial=True)
            if orientador.is_valid():
                orientador.save()
                return Response({"message": "Orientador atualizado com sucesso!"}, status=status.HTTP_200_OK)
            else:
                return Response(orientador.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Orientador.DoesNotExist:
            return Response({"error": "Orientador não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
class ExcluirOrientadorView(APIView):
    def delete(self, request, orientador_id):
        try:
            instancia_orientador = Orientador.objects.get(id=orientador_id)
            instancia_orientador.delete()    
            return Response({"message": "Orientador excluído com sucesso!"}, status=status.HTTP_200_OK)
        
        except Orientador.DoesNotExist:
            return Response({"error": "Orientador não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class ObterOrientadorPeloIdView(APIView):
    def get(self, request, orientador_id):
        try:
            orientador = Orientador.objects.get(id=orientador_id)
            serializer = OrientadorSerializer(orientador)
            return Response(serializer.data, status=status.HTTP_200_OK)            
            
        except Orientador.DoesNotExist:
            return Response({"error": "Orientador não encontrado."}, status=status.HTTP_404_NOT_FOUND)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FiltrarOrientadorPorCPFView(APIView):
    def get(self, request, cpf):
        try:
            orientador = Orientador.objects.get(cpf=cpf)
            serializer = OrientadorSerializer(orientador)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Orientador.DoesNotExist:
            return Response({"error": "Orientador não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class FiltrarOrientadorPorNomeView(APIView):
    def get(self, request, nome_orientador):
        try:
            orientadores = Orientador.objects.filter(nome_completo__icontains=nome_orientador)
            serializer = OrientadorSerializer(orientadores, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)