# Etapa 1: Construção da aplicação Angular
FROM registry-docker.weg.net/node:latest AS build

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos da aplicação e constrói
COPY . .
RUN npm run build 

# Etapa 2: Configuração do NGINX para servir a aplicação
FROM registry-docker.weg.net/nginx:alpine

# Copia os arquivos compilados para a pasta padrão do nginx
COPY --from=build /app/dist/evolve /usr/share/nginx/html

# Exponha a porta que o NGINX usará
EXPOSE 80

# Comando padrão para iniciar o NGINX
CMD ["nginx", "-g", "daemon off;"]
