from django.contrib import admin
from django.contrib.auth.models import Group

admin.site.unregister(Group)

from .models import Refugio
from .models import Veterinario
from .models import Donacion
from .models import Reporte
from .models import Perfil
from .models import TipoAnimal
from .models import Animal

class RefugioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "telefono", "email", "direccion", "ciudad", "provincia")


class VeterinariosAdmin(admin.ModelAdmin):
    list_display = ("matricula", "nombre", "telefono", "email","refugio")


class DonacionAdmin(admin.ModelAdmin):
    list_display = ("id", "monto", "usuario")


class ReporteAdmin(admin.ModelAdmin):
    list_display = ("id", "direccion", "motivo", "descripcion","usuario")


class PerfilAdmin(admin.ModelAdmin):
    list_display = ("usuario","nombre", "Apellido", "telefono", "direccion", "ciudad", "provincia")

class TipoAnimalAdmin(admin.ModelAdmin):
    list_display = ["tipo"]


class AnimalAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion", "fecha_ingreso", "img", "refugio", "tipo", "usuario")

admin.site.register(Refugio, RefugioAdmin)
admin.site.register(Veterinario, VeterinariosAdmin)
admin.site.register(Donacion, DonacionAdmin)
admin.site.register(Reporte, ReporteAdmin)
admin.site.register(Perfil, PerfilAdmin)
admin.site.register(TipoAnimal, TipoAnimalAdmin)
admin.site.register(Animal, AnimalAdmin)
