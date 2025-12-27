from django.urls import path
from .views import CriarOrientadorView, FiltrarOrientadorPorNomeView, ListarOrientadoresView, AtualizarOrientadorView, ExcluirOrientadorView, FiltrarOrientadorPorNomeView, FiltrarOrientadorPorCPFView, ObterOrientadorPeloIdView

app_name = 'orientador'

urlpatterns = [
    path('criar/', CriarOrientadorView.as_view(), name='criar_orientador'),
    path('listar/', ListarOrientadoresView.as_view(), name='listar_orientadores'),
    path('atualizar/<int:orientador_id>/', AtualizarOrientadorView.as_view(), name='atualizar_orientador'),
    path('excluir/<int:orientador_id>/', ExcluirOrientadorView.as_view(), name='excluir_orientador'),
    path('filtrar-pelo-nome/<str:nome>/', FiltrarOrientadorPorNomeView.as_view(), name='filtrar_orientadores_nome'),    
    path('filtrar-pelo-cpf/<int:orientador_cpf>/', FiltrarOrientadorPorCPFView.as_view(), name='filtrar_orientadores_cpf'),        
    path('obter-pelo-id/<int:orientador_id>/', ObterOrientadorPeloIdView.as_view(), name='obter_orientador_pelo_id')
]