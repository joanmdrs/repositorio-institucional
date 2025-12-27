from django.urls import path

from .views import (
    CriarCursoView,
    ListarCursosView,
    AtualizarCursoView,
    ExcluirCursoView,
    BuscarCursoPeloNomeView,
    ObterCursoPeloIdView
)

app_name = "curso"
urlpatterns = [
    path("criar/", CriarCursoView.as_view(), name="criar_curso"),
    path("listar/", ListarCursosView.as_view(), name="listar_cursos"),
    path("atualizar/<int:curso_id>/", AtualizarCursoView.as_view(), name="atualizar_curso"),
    path("excluir/<int:curso_id>/", ExcluirCursoView.as_view(), name="excluir_curso"),
    path("buscar-pelo-nome/", BuscarCursoPeloNomeView.as_view(), name="buscar_curso_nome"), 
    path("obter-pelo-id/<int:curso_id>/", ObterCursoPeloIdView.as_view(), name="obter_curso_pelo_id")
]   

