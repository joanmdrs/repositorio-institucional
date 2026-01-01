from django.urls import path

from .views import CriarParticipacaoTrabalho, ListarParticipacaoTrabalhoView, ExcluirParticipacaoTrabalhoView

app_name = "participacao_trabalho"

urlpatterns = [
    path("criar/", CriarParticipacaoTrabalho.as_view(), name="criar_participacao_trabalho"),
    path("listar/", ListarParticipacaoTrabalhoView.as_view(), name="listar_participacao_trabalho"),
    path("excluir/<int:participacao_trabalho_id>/", ExcluirParticipacaoTrabalhoView.as_view(), name="excluir_participacao_trabalho")
]