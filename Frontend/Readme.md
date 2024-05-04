# Guía de Inicialización del Proyecto

## Frontend (Angular)

1. Haz clic derecho sobre la carpeta "animalesCommerce" y selecciona "Open in Integrated Terminal".
2. Ejecuta el siguiente comando para instalar las dependencias:
   ```
   npm install
   ```
3. Instala Angular CLI globalmente con el siguiente comando:
   ```
   npm install -g @angular/cli
   ```
4. Inicia el servidor de desarrollo y abre la aplicación en el navegador con el siguiente comando:
   ```
   ng serve -o


**Nota:** Los componentes "Refugios" y "Veterinarios" obtienen los datos desde Angular utilizando el archivo `db.json`.



## Base de datos (db.json)

1. Abre otro terminal integrado en la carpeta "animalesCommerce".
2. Instala `json-server` globalmente con el siguiente comando:
   ```
   npm install -g json-server
   ```
3. Inicia el servidor `json-server` con el siguiente comando:
   ```
   json-server db.json
   ```