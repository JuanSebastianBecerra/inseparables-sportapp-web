# Se usa la úlima versión de la imagen oficial de nginx como imagen base 
FROM nginx:latest

# Se copia la configuración personalizada de nginx a la ubicación por defecto del contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Se copia la aplicación de angular ya construida a la carpeta html por defecto de nginx 
COPY /dist/inseparables-sportapp-web /usr/share/nginx/html
