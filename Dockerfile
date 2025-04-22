# Build Stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Serve Stage
FROM nginx:stable-alpine

# Copy built React files into nginx public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add your own nginx config
COPY nginx.conf /etc/nginx/conf.d

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
