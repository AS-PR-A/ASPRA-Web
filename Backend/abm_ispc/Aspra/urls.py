from django.urls import path, include
from .views import (
    VerAnimalesView,
    AgregarAnimalView,
    VerContactoView,
    VerDonacionView,
)
#-------------------user
from knox import views as knox_views
from .views import LoginAPI
from .views import RegisterAPI
#-------------------fin_user

urlpatterns = [
    #-------------------user
     path('auth/registro', RegisterAPI.as_view(), name='register'),
     path('auth/login', LoginAPI.as_view(), name='login'),
     path('auth/logout', knox_views.LogoutView.as_view(), name='logout'),
     path('auth/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    # path("auth/login/", LoginView.as_view(), name="auth_login"),
    # path("auth/logout/", LogoutView.as_view(), name="auth_logout"),
    # path("auth/signup/", SignupView.as_view(), name="auth_signup"),
    path("pages/animales/", VerAnimalesView.as_view({"get": "list"}), name="pages_VerAnimales"),
    path("pages/contacto/", VerContactoView.as_view({"get": "list"}), name="pages_VerContacto"),
    path("pages/donacion/", VerDonacionView.as_view({"get": "list"}), name="pages_VerDonacion"),
    path("pages/agregarAnimal/", AgregarAnimalView.as_view(), name="pages_agregarAnimal"),
]
