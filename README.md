# Curso: De 0 a experto - 2022 (Udemy)

## Autenticación con Sockets

### Sección 16:

A continuación veremos cómo establecer establecer una comunicación con nuestro WebSocket Server, pero validando la autenticación del usuario, y a la vez confirmar que los mensajes enviados por ese usuario son de quien dice ser.

Puntualmente veremos:

1. Autenticar Sockets
2. Usar JWT para validar Sockets
3. Headers personalizados para Sockets
4. Implementar el login en el FrontEnd
5. Implementar y usar el GoogleSign in creado
6. Enviar mensajes privados
7. Enviar mensajes a salas
8. Enviar mensajes globales

Para instalar las dependencias ejecutar el comando:
```
npm install
```

La ejecución se realiza con el comando:
```
npm start
```

Para la ejecución utilizando Docker:
```
docker run --name socket-cola -p 85:3510 -d ejtalavera/node-sockets
```

versiones:  
Node 21.6.1  
Docker image: current-alpine3.21  
