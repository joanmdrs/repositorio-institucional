from django.db import models

class Orientador(models.Model):
    
    TITULACAO_CHOICES = [
        ('GRAD', 'Graduação'),
        ('ESPE', 'Especialização'),
        ('MEST', 'Mestrado'),
        ('DOUT', 'Doutorado'),
        ('POSDOUT', 'Pós-Doutorado'),
    ]
    
    nome = models.CharField(max_length=255)
    cpf = models.CharField(max_length=14, unique=True)
    matricula = models.CharField(max_length=20, unique=True)
    email = models.EmailField()
    titulacao = models.CharField(max_length=50, choices=TITULACAO_CHOICES)

    def __str__(self):
        return self.nome

    def __unicode__(self):
        return self.nome