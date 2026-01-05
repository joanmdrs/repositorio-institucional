from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter
from core.pagination import DefaultPagination
from apps.usuario.models import Usuario
from .serializers import UsuarioWriteSerializer, UsuarioReadSerializer
from rest_framework.permissions import AllowAny

class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all().order_by("id")
    permission_classes = [AllowAny]
    pagination_class = DefaultPagination
    filter_backends = [SearchFilter]
    search_fields = ['username']
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return UsuarioReadSerializer
        return UsuarioWriteSerializer
