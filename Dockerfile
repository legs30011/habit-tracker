FROM node:20-alpine AS build

WORKDIR /app

# Copia package.json y package-lock.json PRIMERO para que npm install los encuentre
# y para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install --force

COPY . .

# Construye la aplicación React (esto creará la carpeta 'build' o 'dist')
RUN npm run build

# --- Nginx ---
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

#puerto 80 para el tráfico HTTP
EXPOSE 80

# Comando para iniciar Nginx cuando el contenedor se inicie
CMD ["nginx", "-g", "daemon off;"]
