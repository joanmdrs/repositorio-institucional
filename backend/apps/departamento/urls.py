from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartamentoViewSett

router = DefaultRouter()
router.register(r'', DepartamentoViewSett, basename='departamento')

app_name = 'departamento'

urlpatterns = [
    path('', include(router.urls)),
]
