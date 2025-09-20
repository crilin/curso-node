# Curso: De 0 a experto - 2022 (Udemy)

## Webserver + RestServer - Carga de Archivos

### Sección 13:

Aquí cubriremos varios temas como: 

1. Carga de archivos
2. Validaciones de archivos
3. Re-ubicar archivos
4. Actualizar fotografía de un usuario
5. Borrar archivos
6. Cargar imágenes a los productos
7. Servicio para mostrar y proteger imágenes
8. Uso de dichas imágenes en el front-end
9. Cloudinary
10. Cloudinary SDK

Pasos para crear un endpoint del API:
1. En /models/server.js crear la configuración de acceso al API y las rutas de acceso a los endpoints.
2. En /routes/*.js crear las peticiones a utilizar con las validaciones correspondientes.
3. En /middlewares se evaluan los errores correspondientes a las validaciones definidas en /routes/*.js
4. En /controllers se realizan validaciones propias de cada petición a utilizar en el API 

Para instalar las dependencias ejecutar el comando:
npm install

La ejecución se realiza con el comando:
npm start

versiones:
Node 21.6.1
