# Guía de Inicialización del Proyecto

## Backend (Django)

1. Abre un terminal integrado en la carpeta "abm_ispc" (la primera carpeta dentro de "Backend").
2. Instala un entorno virtual con el siguiente comando:
   ```
   python -m pip install virtualenv
   ```
4. Crea un entorno virtual con el siguiente comando:
   ```
   python -m venv django
   ```
5. Activa el entorno virtual con el siguiente comando:
   ```
   venv\Scripts\activate  # En Windows
   source django/bin/activate  # En Unix o MacOS
   ```
6. Instala Django con el siguiente comando:
   ```
   python -m pip install Django
   ```
7. Instala las dependencias necesarias con los siguientes comandos:
   ```
   pip install mysqlclient
   pip install djangorestframework
   pip install django-cors-headers
   ```
8. Instala Django Rest Knox con el siguiente comando:
   ```
   python -m pip install django-rest-knox
   ```
9. Activa Django con el siguiente comando:
   ```
   django\Scripts\activate  # En Windows
   source django/bin/activate  # En Unix o MacOS
   ```   
10. Inicia el servidor de desarrollo con el siguiente comando:
    ```
    py manage.py runserver
    ```
