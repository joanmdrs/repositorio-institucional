from django.urls import path
from .views import CriarAutorView, ListarAutoresView, AtualizarAutorView, ExcluirAutorView, FiltrarAutorPeloNomeView, FiltrarAutorPeloIdView

app_name = 'autor'
urlpatterns = [
    # URLs para a API de Autores
    path('criar/', CriarAutorView.as_view(), name='criar_autor'),
    path('listar/', ListarAutoresView.as_view(), name='listar_autores'),
    path('atualizar/<int:autor_id>/', AtualizarAutorView.as_view(), name='atualizar_autor'),
    path('excluir/<int:autor_id>/', ExcluirAutorView.as_view(), name='excluir_autor'),
    path('filtrar-pelo-nome/<str:nome>/', FiltrarAutorPeloNomeView.as_view(), name='filtrar_autores_nome'),    
    path('filtrar-pelo-id/<int:autor_id>/', FiltrarAutorPeloIdView.as_view(), name='filtrar_autores_id'),
]
    
    