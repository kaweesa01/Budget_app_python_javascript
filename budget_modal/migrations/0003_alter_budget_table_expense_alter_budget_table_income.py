# Generated by Django 4.1.7 on 2023-06-05 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('budget_modal', '0002_alter_budget_table_budget_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='budget_table',
            name='expense',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='budget_table',
            name='income',
            field=models.IntegerField(blank=True),
        ),
    ]
