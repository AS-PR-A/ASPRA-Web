from django.urls import path
from .views import (VerDonacionesView, VerRefugiosView, VerVeterinariosView, AnimalesView, PerfilView)

#-------------------user
from knox import views as knox_views
from .views import LoginAPI
from .views import RegisterAPI
#-------------------fin_user

urlpatterns = [
    #-------------------user
    path('auth/registro/', RegisterAPI.as_view(), name='auth_register'),
    path('auth/login/', LoginAPI.as_view(), name='auth_login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='auth_logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='auth_logoutall'),
    path("pages/donaciones/", VerDonacionesView.as_view({"get": "list"}), name="pages_verDonaciones"),
    path("pages/refugios/listado/", VerRefugiosView.as_view({"get": "list"}), name="pages_verRefugios"),
    path("pages/veterinarios/listado/", VerVeterinariosView.as_view({"get": "list"}), name="pages_verVeterinarios"),
    path("pages/animales/agregar/", AnimalesView.as_view({"post": "create"}), name="pages_agregarAnimal"),
    path("pages/animales/listado/", AnimalesView.as_view({"get": "list"}), name="pages_verAnimales"),
    path("pages/animales/<id>/", AnimalesView.as_view({"get": "retrieve"}), name="pages_verAnimal"),
    path("pages/animales/modificar/<id>/", AnimalesView.as_view({"put": "update"}), name="pages_modificarAnimal"),
    path("pages/animales/eliminar/<id>/", AnimalesView.as_view({"delete": "delete"}), name="pages_eliminarAnimal"),
    path("pages/perfiles/<id>/", PerfilView.as_view({"get": "retrieve"}), name="pages_verPerfil"),
]
