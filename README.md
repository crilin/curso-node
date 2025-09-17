# Curso: De 0 a experto - 2022 (Udemy)

## Webserver + RestServer

Aquí cubriremos varios temas como:

1. Generar API Key de Google
2. Generar API Secret
3. Usar librerías de Google para la validación de tokens
4. Tips importantes en PostMan
5. Despliegues a Heroku
6. Uso del Google SignIn en el Front-End
7. Crear usuarios personalizados en base a respuestas de Google

Pasos para crear un endpoint del API:
1. En /models/server.js crear la configuración de acceso al API y las rutas de acceso a los endpoints.
2. En /routes/*.js crear las peticiones a utilizar con las validaciones correspondientes.
3. En /middlewares se evaluan los errores correspondientes a las validaciones definidas en /routes/*.js
4. En /controllers se realizan validaciones propias de cada petición a utilizar en el API 

Para ejecutar la aplicación ejecutar el comando:
npm install

La ejecución se realiza con el comando:
npm startgit 
