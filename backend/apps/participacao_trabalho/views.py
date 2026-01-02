from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ParticipacaoTrabalho
from .serializers import ParticipacaoTrabalhoSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

class CriarParticipacaoTrabalho(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            serializer = ParticipacaoTrabalhoSerializer(data=request.data, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ListarParticipacaoTrabalhoView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        try:
            objs_participacao_trabalho = ParticipacaoTrabalho.objects.all()
            serializer = ParticipacaoTrabalhoSerializer(objs_participacao_trabalho, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ExcluirParticipacaoTrabalhoView(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, participacao_trabalho_id):
        try:
            participacao_trabalho = ParticipacaoTrabalho.objects.get(id=participacao_trabalho_id)
            participacao_trabalho.delete()
            return Response(
                {"message": "Objeto ParticipacaoTrabalho foi excluído com sucesso."}, status=status.HTTP_200_OK)
            
        except ParticipacaoTrabalho.DoesNotExist:
            return Response(
                {"error": "Objeto ParticipacaoTrabalho não encontrado."},
                status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    