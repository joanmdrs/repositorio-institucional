from django.db import models

class Autor(models.Model):
    
    nome_completo = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    email = models.EmailField(blank=True, null=True)
    matricula = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nome_completo

    def __unicode__(self):
        return self.nome_completo