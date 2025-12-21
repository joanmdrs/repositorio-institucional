from django.contrib import admin
from .models import Autor

class AutorAdmin(admin.ModelAdmin):
    list_display = ('nome_completo', 'cpf', 'email', 'matricula')
    search_fields = ('nome_completo', 'cpf', 'email', 'matricula')

admin.site.register(Autor, AutorAdmin)