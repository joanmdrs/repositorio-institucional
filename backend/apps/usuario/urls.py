from django.urls import path
from .views import CriarUsuarioView, ListarUsuariosViews, ObterUsuarioPeloIdView, ExcluirUsuarioView, ListarGruposView
from .token.custom_token import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView


app_name = "usuario"

urlpatterns = [
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),  
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("criar/", CriarUsuarioView.as_view(), name="criar_usuario"),
    path("listar/", ListarUsuariosViews.as_view(), name="listar_usuarios"),
    path("obter-pelo-id/<int:usuario_id>/", ObterUsuarioPeloIdView.as_view(), name="obter_usuario_pelo_id"),
    path("excluir/<int:usuario_id>/", ExcluirUsuarioView.as_view(), name="excluir_usuario"),
    path("grupos/listar/", ListarGruposView.as_view(), name='listar_grupos')
]