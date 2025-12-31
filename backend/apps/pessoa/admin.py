from django.contrib import admin
from .models import Pessoa

class PessoaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'email', 'telefone', 'titulacao')
    search_fields = ['nome', 'cpf']

admin.site.register(Pessoa, PessoaAdmin)
