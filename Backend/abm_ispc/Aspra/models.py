from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save #Relaciona los datos con la tabla User de knox

class Refugio(models.Model):
    nombre = models.CharField(max_length=45, blank=False, primary_key=True)
    horario = models.CharField(max_length=80) 
    telefono = models.CharField(max_length=45, blank=False)
    email = models.EmailField(blank=False)
    direccion = models.CharField(max_length=45, blank=False)
    ciudad = models.CharField(max_length=45, blank=False)
    provincia = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = "Refugio"
        verbose_name = "Refugio"
        verbose_name_plural = "Refugios"

    def __unicode__(self):
        return self.nombre + " " + self.direccion

    def __str__(self):
        return self.direccion


class Veterinario(models.Model):
    matricula = models.CharField(primary_key=True, max_length=45, blank=False)
    nombre = models.CharField(max_length=45, blank=False)
    telefono = models.CharField(max_length=45, blank=False)
    email = models.EmailField(blank=False)
    refugio = models.ForeignKey(Refugio, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "Veterinario"
        verbose_name = "Veterinario"
        verbose_name_plural = "Veterinarios"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre

class TipoAnimal(models.Model):
    tipo = models.CharField(max_length=45, blank=False, primary_key=True)

    class Meta:
        db_table = "TipoAnimal"
        verbose_name = "TipoAnimal"
        verbose_name_plural = "TiposAnimales"

    def __unicode__(self):
        return self.tipo

    def __str__(self):
        return self.tipo

class Perfil(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile") #Relaciona los datos con la tabla User de knox
    nombre = models.CharField(max_length=45, blank=False)
    apellido = models.CharField(max_length=45, blank=False)
    telefono = models.CharField(max_length=45, blank=False)
    direccion = models.CharField(max_length=45, blank=False)
    ciudad = models.CharField(max_length=45, blank=False)
    provincia = models.CharField(max_length=45, blank=False)

    class Meta:
        db_table = "Perfil"
        verbose_name = "Perfil"
        verbose_name_plural = "Perfiles"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre

class Animal(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=45, blank=False)
    descripcion = models.CharField(max_length=180, blank=False)
    fecha_ingreso = models.DateField(blank=False)
    img = models.CharField(max_length=500, blank=False)
    # img = models.ImageField(upload_to='animales/')
    refugio = models.ForeignKey(Refugio, on_delete=models.SET_NULL, null=True) 
    tipo = models.ForeignKey(TipoAnimal, on_delete=models.SET_NULL, null=True) 
    usuario = models.ForeignKey(Perfil, on_delete=models.SET_NULL, null=True, blank=True)   

    class Meta:
        db_table = "Animal"
        verbose_name = "Animal"
        verbose_name_plural = "Animales"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre

class Reporte(models.Model):
    id = models.AutoField(primary_key=True)
    direccion = models.CharField(max_length=45, blank=False)
    motivo = models.CharField(max_length=45, blank=False)
    descripcion = models.TextField(max_length=150, blank=False)
    usuario = models.ForeignKey(Perfil, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "Reporte"
        verbose_name = "Reporte"
        verbose_name_plural = "Reportes"

    def __unicode__(self):
        return self.direccion

    def __str__(self):
        return self.direccion

class Donacion(models.Model):
    id = models.AutoField(primary_key=True)
    monto = models.PositiveIntegerField()
    usuario = models.ForeignKey(Perfil, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "Donacion"
        verbose_name = "Donacion"
        verbose_name_plural = "Donaciones"

    def __unicode__(self):
        return self.id

    def __str__(self):
        return str(self.id)

#Crear perfil y asociarlo a un usuario nuevo automaticamente
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)

def save_user_profile(sender,instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

