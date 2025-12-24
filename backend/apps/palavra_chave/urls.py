from django.urls import path

from .views import CriarPalavraChaveView, ListarPalavrasChaveView, AtualizarPalavraChaveView, BuscarPalavraChavePeloTermoView, ExcluirPalavraChaveView

app_name = "palavra_chave"

urlpatterns = [
    path("criar/", CriarPalavraChaveView.as_view(), name="criar_palavra_chave"),
    path("listar/", ListarPalavrasChaveView.as_view(), name="listar_palavras_chave"),
    path("atualizar/<int:palavra_chave_id>/", AtualizarPalavraChaveView.as_view(), name="atualizar_palavra_chave"),
    path("excluir/<int:palavra_chave_id>/", ExcluirPalavraChaveView.as_view(), name="excluir_palavra_chave"),
    path("buscar-pelo-termo/", BuscarPalavraChavePeloTermoView.as_view(), name="buscar_palavra_chave_termo"), 
]
