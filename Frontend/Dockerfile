# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production

# Nastavení pracovní složky
WORKDIR /usr/share/nginx/html

# Smazání defaultního obsahu Nginxu (aby tam nebyl výchozí index.html)
RUN rm -rf ./*

# Kopírování sestavené React aplikace
COPY --from=build /app/dist ./

# Kopírování vlastního nginx konfiguráku (dùležité!)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Otevøení portu 80
EXPOSE 80

# Spuštìní Nginxu
CMD ["nginx", "-g", "daemon off;"]