from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=700)
    image = models.ImageField(
        upload_to= "projects/",
        blank= True,
        null= True
    )
    tech_stack = models.CharField(max_length=200)
    git_url = models.URLField(max_length=200)
    live_demo = models.URLField(
        max_length=200,    
        blank=True,        
        null=True          
    )
    def __str__(self):
        return self.name
