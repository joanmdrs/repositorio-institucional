"""
URL configuration for projeto project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("repo/admin/", admin.site.urls),
    path("repo/pessoa/", include("apps.pessoa.urls", namespace="pessoa")),
    path("repo/autor/", include("apps.autor.urls", namespace="autor")),
    path("repo/orientador/", include("apps.orientador.urls", namespace="orientador")),
    path("repo/departamento/", include("apps.departamento.urls", namespace="departamento")),
    path("repo/curso/", include("apps.curso.urls", namespace="curso")),
    path("repo/palavra_chave/", include("apps.palavra_chave.urls", namespace="palavra_chave")),
    path("repo/trabalho/", include("apps.trabalho.urls", namespace="trabalho")),
    path("repo/arquivo/", include("apps.arquivo.urls", namespace="arquivo")),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )