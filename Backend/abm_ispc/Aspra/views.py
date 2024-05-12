from django.contrib.auth import login
from django.shortcuts import get_object_or_404
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

class AnimalesView(viewsets.ViewSet):

    def list(self,request):
        permission_classes = [AllowAny]
        queryset = Animal.objects.all()
        serializer = AnimalSerializer(queryset, many = True)
        return Response(serializer.data)
    
    def create(self,request):
        serializer = AnimalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self,request,id):
        queryset = Animal.objects.all()
        animal = get_object_or_404(queryset,id=id)
        serializer = AnimalSerializer(animal)
        return Response(serializer.data)    
    
    def update(self, request, id=None):
        queryset = Animal.objects.get(id=id)
        serializer = AnimalSerializer(instance = queryset, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self,request,id):
        queryset = Animal.objects.get(id=id)
        queryset.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

    


