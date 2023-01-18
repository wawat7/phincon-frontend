FROM node:16-alpine3.17 AS builder

#Environtment
ARG BACKEND_BASE_URL=''
ARG POKEMON_BASE_URL=''
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

#write env
RUN echo "REACT_APP_BACKEND_BASE_URL=${BACKEND_BASE_URL}"  >> ".env"
RUN echo "REACT_APP_POKEMON_BASE_URL=${POKEMON_BASE_URL}"  >> ".env"
# install node modules and build assets
RUN npm install && npm run build

# nginx state for serving content
FROM nginx:alpine
#add CURL
RUN apk --no-cache add curl
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Copy nginx config
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
#healthcheck
HEALTHCHECK --interval=20s --start-period=5s CMD curl -f http://localhost:80
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]