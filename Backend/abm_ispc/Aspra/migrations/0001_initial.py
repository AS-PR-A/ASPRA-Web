# Generated by Django 5.0.5 on 2024-05-12 17:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Perfil',
            fields=[
                ('usuario', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='profile', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('nombre', models.CharField(max_length=45)),
                ('Apellido', models.CharField(max_length=45)),
                ('telefono', models.CharField(max_length=45)),
                ('direccion', models.CharField(max_length=45)),
                ('ciudad', models.CharField(max_length=45)),
                ('provincia', models.CharField(max_length=45)),
            ],
            options={
                'verbose_name': 'Perfil',
                'verbose_name_plural': 'Perfiles',
                'db_table': 'Perfil',
            },
        ),
        migrations.CreateModel(
            name='Refugio',
            fields=[
                ('nombre', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('horario', models.CharField(max_length=80)),
                ('telefono', models.CharField(max_length=45)),
                ('email', models.EmailField(max_length=254)),
                ('direccion', models.CharField(max_length=45)),
                ('ciudad', models.CharField(max_length=45)),
                ('provincia', models.CharField(max_length=45)),
            ],
            options={
                'verbose_name': 'Refugio',
                'verbose_name_plural': 'Refugios',
                'db_table': 'Refugio',
            },
        ),
        migrations.CreateModel(
            name='TipoAnimal',
            fields=[
                ('tipo', models.CharField(max_length=45, primary_key=True, serialize=False)),
            ],
            options={
                'verbose_name': 'TipoAnimal',
                'verbose_name_plural': 'TiposAnimales',
                'db_table': 'TipoAnimal',
            },
        ),
        migrations.CreateModel(
            name='Donacion',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('monto', models.PositiveIntegerField()),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.perfil')),
            ],
            options={
                'verbose_name': 'Donacion',
                'verbose_name_plural': 'Donaciones',
                'db_table': 'Donacion',
            },
        ),
        migrations.CreateModel(
            name='Reporte',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('direccion', models.CharField(max_length=45)),
                ('motivo', models.CharField(max_length=45)),
                ('descripcion', models.TextField(max_length=150)),
                ('usuario', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.perfil')),
            ],
            options={
                'verbose_name': 'Reporte',
                'verbose_name_plural': 'Reportes',
                'db_table': 'Reporte',
            },
        ),
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('alias', models.CharField(max_length=45)),
                ('descripcion', models.CharField(max_length=180)),
                ('fecha_ingreso', models.DateField()),
                ('img', models.CharField(max_length=45)),
                ('usuario', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.perfil')),
                ('refugio', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.refugio')),
                ('tipo', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.tipoanimal')),
            ],
            options={
                'verbose_name': 'Animal',
                'verbose_name_plural': 'Animales',
                'db_table': 'Animal',
            },
        ),
        migrations.CreateModel(
            name='Veterinario',
            fields=[
                ('matricula', models.CharField(max_length=45, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=45)),
                ('telefono', models.CharField(max_length=45)),
                ('email', models.EmailField(max_length=254)),
                ('refugio', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='Aspra.refugio')),
            ],
            options={
                'verbose_name': 'Veterinario',
                'verbose_name_plural': 'Veterinarios',
                'db_table': 'Veterinario',
            },
        ),
    ]
