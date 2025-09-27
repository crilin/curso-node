# Un archivo docker (dockerfile) comienza siempre importanto la imagen base. 
# Utilizamos la palabra clave 'FROM' para hacerlo.
# En nuestro ejemplo, queremos importar la imagen de python.
# Así que escribimos 'python' para el nombre de la imagen y 'latest' para la versión.
FROM node:current-alpine3.21

# Docker Node image includes a non-root node user
# that you can use to avoid running your application container as root.
# It is a recommended security practice to avoid running containers as root 
# and to restrict capabilities within the container
# To fine-tune the permissions on our application code in the container,
# let’s create the node_modules subdirectory in /home/node along with the app directory
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /usr/src/app

# Aquí ponemos el archivo en la carpeta raíz de la imagen.
COPY package*.json ./

# switch the user to node before running
# USER node

RUN npm install

#COPY --chown=node:node . .
COPY . .

EXPOSE 3510

# Necesitamos definir el comando a lanzar cuando vayamos a ejecutar la imagen.
# Utilizamos la palabra clave 'CMD' para hacerlo.
CMD ["node", "app.js"]
