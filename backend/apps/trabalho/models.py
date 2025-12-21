from django.db import models
from apps.curso.models import Curso
from apps.orientador.models import Orientador
from apps.autor.models import Autor
from apps.palavra_chave.models import PalavraChave

class Trabalho(models.Model):
    TIPO_CHOICES = [
        ('ART', 'Artigo'),
        ('MON', 'Monografia'),
        ('DIS', 'Dissertação'),
        ('TES', 'Tese'),
    ]

    titulo = models.CharField(max_length=500)
    resumo = models.TextField()
    ano_defesa = models.PositiveIntegerField()
    data_defesa = models.DateField()

    tipo = models.CharField(max_length=3, choices=TIPO_CHOICES)
    idioma = models.CharField(max_length=50)

    curso = models.ForeignKey(Curso, on_delete=models.PROTECT)
    orientador = models.ForeignKey(Orientador, on_delete=models.PROTECT, related_name='orientacoes')
    coorientador = models.ForeignKey(
        Orientador, on_delete=models.PROTECT, null=True, blank=True, related_name='coorientacoes'
    )

    autores = models.ManyToManyField(Autor)
    palavras_chave = models.ManyToManyField(PalavraChave)

    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
