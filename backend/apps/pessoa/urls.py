from django.urls import path
from .views import CriarPessoaView, AtualizarPessoaView, ListarPessoasView, ObterPessoaPeloIdView, ExcluirPessoaView

app_name = 'pessoa'

urlpatterns = [
    path('criar/', CriarPessoaView.as_view(), name='criar_pessoa'),
    path('atualizar/<int:pessoa_id>/', AtualizarPessoaView.as_view(), name='atualizar_pessoa'),
    path('listar/', ListarPessoasView.as_view(), name='listar_pessoas'),
    path('obter-pelo-id/<int:pessoa_id>/', ObterPessoaPeloIdView.as_view(), name='obter_pessoa_pelo_id'),
    path('excluir/<int:pessoa_id>/', ExcluirPessoaView.as_view(), name='excluir_pessoa_pelo_id')
]