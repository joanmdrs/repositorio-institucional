from django.contrib import admin
from apps.orientador.models import Orientador

class OrientadorAdmin(admin.ModelAdmin):
    list_display = ('nome_completo', 'cpf', 'matricula', 'email', 'titulacao')
    search_fields = ('nome_completo', 'cpf', 'matricula', 'email')
    list_filter = ('titulacao',)    
    
admin.site.register(Orientador, OrientadorAdmin)
