from django.contrib.auth import login
from rest_framework import status, generics, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from knox.models import AuthToken
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from .serializers import UserSerializer, RegisterSerializer, AnimalSerializer, DonacionSerializer, RefugioSerializer, VeterinarioSerializer
from .models import Animal, Donacion, Refugio, Veterinario

#----------user
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)
#----------fin_user

# class VerContactoView(viewsets.ReadOnlyModelViewSet):
#     permission_classes = [AllowAny]
#     queryset = Contacto.objects.all()
#     serializer_class = ContactoSerializer

class VerDonacionesView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Donacion.objects.all()
    serializer_class = DonacionSerializer

class VerRefugiosView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Refugio.objects.all()
    serializer_class = RefugioSerializer

class VerVeterinariosView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Veterinario.objects.all()
    serializer_class = VeterinarioSerializer

class VerAnimalesView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

class AgregarAnimalView(APIView):
    permission_classes = [AllowAny]
    # permission_classes = [IsAdminUser]
    def post(self, request, format=None):
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
