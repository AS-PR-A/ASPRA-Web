from django.urls import path
from .views import (VerDonacionesView, VerRefugiosView, VerVeterinariosView, AnimalesView)

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
    # path("pages/contacto/", VerContactoView.as_view({"get": "list"}), name="pages_VerContacto"),
    path("pages/donaciones/", VerDonacionesView.as_view({"get": "list"}), name="pages_verDonaciones"),
    path("pages/refugios/listado/", VerRefugiosView.as_view({"get": "list"}), name="pages_verRefugios"),
    path("pages/veterinarios/listado/", VerVeterinariosView.as_view({"get": "list"}), name="pages_verVeterinarios"),
    path("pages/animales/agregar/", AnimalesView.as_view({"post": "create"}), name="pages_agregarAnimal"),
    path("pages/animales/listado/", AnimalesView.as_view({"get": "list"}), name="pages_verAnimales"),
]
