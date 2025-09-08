# Curso: De 0 a experto - 2022 (Udemy)

## Webserver + RestServer

En esta sección se realiza la configuración de una API RestServer con sus peticiones GET, POST, PUT, DELETE

Aquí cubriremos varios temas como:

- Definir los alcances de nuestro RESTServer
- CRUD
- Encriptación de contraseñas
- Validaciones personalizadas
- Creación de roles
- Conexiones con MongoDB - MongoAtlas
- Despliegue de base de datos en la nube
- Conexión con mongoose con base de datos en la nube
- Configuración de variables de entorno
- Borrado de archivos
- Eliminado físico de la base de datos
- Eliminación por estado en un campo de la colección

Pasos para crear un endpoint del API:
1. En /models/server.js crear la configuración de acceso al API y las rutas de acceso a los endpoints.
2. En /routes/*.js crear las peticiones a utilizar con las validaciones correspondientes.
3. En /middlewares se evaluan los errores correspondientes a las validaciones definidas en /routes/*.js
4. En /controllers se realizan validaciones propias de cada petición a utilizar en el API 

Para ejecutar la aplicación ejecutar el comando:
npm install

La ejecución se realiza con el comando:
npm startgit 
