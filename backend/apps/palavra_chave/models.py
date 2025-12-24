from django.db import models

class PalavraChave(models.Model):
    termo = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.termo
