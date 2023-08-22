FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



# Express Proxy:
# FROM node:alpine

# COPY . /app

# WORKDIR /app
# RUN npm install 

# WORKDIR /app

# EXPOSE 4000

# CMD node server.js
