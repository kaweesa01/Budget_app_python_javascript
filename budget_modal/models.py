from django.db import models


# Create your models here.
class Budget_table(models.Model):
    budget_type = models.CharField(choices=(('inc','+'),('exp','-')), max_length=50)
    income = models.IntegerField(blank=True, null=True)
    expense = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=50)
    
    def __str__(self):
        return f' {self.budget_type} - {self.description}' 
    
