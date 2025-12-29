from django.urls import path
from .views import (
    CriarTrabalhoView,
    ListarTrabalhosView,
    AtualizarTrabalhoView,
    FiltrarTrabalhosPeloTituloView,
    FiltrarTrabalhosPeloAnoView,
    FiltrarTrabalhosPeloNomeAutorView,
    ExcluirTrabalhoView, 
    ObterTrabalhoPeloIdView)

app_name = "trabalho"

urlpatterns = [
    path("criar/", CriarTrabalhoView.as_view(), name="criar_trabalho"),
    path("listar/", ListarTrabalhosView.as_view(), name="listar_trabalhos"),
    path("atualizar/<int:trabalho_id>/", AtualizarTrabalhoView.as_view(), name="atualizar_trabalho"),
    path("excluir/<int:trabalho_id>/", ExcluirTrabalhoView.as_view(), name="excluir_trabalho"),
    path("filtrar-pelo-titulo/", FiltrarTrabalhosPeloTituloView.as_view(), name="filtrar_trabalhos_titulo"),
    path("filtrar-pelo-ano/", FiltrarTrabalhosPeloAnoView.as_view(), name="filtrar_trabalhos_ano"),
    path("filtrar-pelo-nome-autor/", FiltrarTrabalhosPeloNomeAutorView.as_view(), name="filtrar_trabalhos_nome_autor"),
    path("obter-pelo-id/<int:trabalho_id>/", ObterTrabalhoPeloIdView.as_view(), name="obter_trabalho_pelo_id")
]   