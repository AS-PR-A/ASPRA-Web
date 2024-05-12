from django.urls import path, include
from .views import ( VerAnimalesView, AgregarAnimalView, VerDonacionesView, VerRefugiosView)

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
     path("pages/animales/listado/", VerAnimalesView.as_view({"get": "list"}), name="pages_VerAnimales"),
     # path("pages/contacto/", VerContactoView.as_view({"get": "list"}), name="pages_VerContacto"),
     path("pages/donaciones/", VerDonacionesView.as_view({"get": "list"}), name="pages_verDonaciones"),
     path("pages/animales/agregar/", AgregarAnimalView.as_view(), name="pages_agregarAnimal"),
     path("pages/refugios/listado/", VerRefugiosView.as_view({"get": "list"}), name="pages_verRefugiosView"),
]
