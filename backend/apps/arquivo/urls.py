from django.urls import path
from .views import CriarArquivoView, ListarArquivosView, ExcluirArquivoView, DownloadArquivoView

app_name = "arquivo"

urlpatterns = [
    path('criar/', CriarArquivoView.as_view(), name='criar-arquivo'),
    path('listar/', ListarArquivosView.as_view(), name='listar-arquivos'),
    path('excluir/<int:arquivo_id>/', ExcluirArquivoView.as_view(), name='excluir-arquivo'),
    path('baixar/<int:arquivo_id>/', DownloadArquivoView.as_view()),

]
