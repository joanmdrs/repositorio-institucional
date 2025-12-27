from django.urls import path
from .views import CriarDepartamentoView, ListarDepartamentosView, AtualizarDepartamentoView, ExcluirDepartamentoView, BuscarDepartamentoPeloNomeView, ObterDepartamentoPeloIdView

app_name = "departamento"
urlpatterns = [
    path("criar/", CriarDepartamentoView.as_view(), name="criar_departamento"),
    path("listar/", ListarDepartamentosView.as_view(), name="listar_departamentos"),
    path("atualizar/<int:departamento_id>/", AtualizarDepartamentoView.as_view(), name="atualizar_departamento"),
    path("excluir/<int:departamento_id>/", ExcluirDepartamentoView.as_view(), name="excluir_departamento"),
    path("buscar-pelo-nome/", BuscarDepartamentoPeloNomeView.as_view(), name="buscar_departamento_nome"),   
    path("obter-pelo-id/<int:departamento_id>/", ObterDepartamentoPeloIdView.as_view(), name="obter_departamento_pelo_id")
]
