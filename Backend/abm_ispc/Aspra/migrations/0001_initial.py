# Generated by Django 4.2.1 on 2023-05-19 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id_reporte', models.AutoField(primary_key=True, serialize=False)),
                ('direccion', models.CharField(max_length=45)),
                ('motivo', models.CharField(max_length=45)),
                ('descripcion', models.TextField(max_length=150)),
            ],
            options={
                'verbose_name': 'Reporte',
                'verbose_name_plural': 'Reportes',
                'db_table': 'Reporte',
            },
        ),
    ]