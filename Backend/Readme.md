# Guía de Inicialización del Proyecto

## Backend (Django)

1. Abre un terminal integrado en la carpeta "abm_ispc" (la primera carpeta dentro de "Backend").
2. Crea un entorno virtual con el siguiente comando:
   ```
   python -m venv django
   ```
3. Activa el entorno virtual con el siguiente comando:
   ```
   django\Scripts\activate  # En Windows
   source django/bin/activate  # En Unix o MacOS
   ```
4. Instala Django con el siguiente comando:
   ```
   python -m pip install Django
   ```
5. Instala las dependencias necesarias con los siguientes comandos:
   ```
   pip install mysqlclient
   pip install djangorestframework
   pip install django-cors-headers
   ```
6. Inicia el servidor de desarrollo con el siguiente comando:
   ```
   py manage.py runserver
   ```
**Nota:** Los componentes "Adoptar" y "Contacto" obtienen los datos del backend.
