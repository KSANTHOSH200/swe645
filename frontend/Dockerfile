# ===========================
# Stage 1: Build React app
# ===========================
FROM node:18-alpine AS build

# Create app directory
WORKDIR /app

# --- API base URL for the React app ---
# This gets passed at build time:
#   docker build --build-arg REACT_APP_API_URL=http://<BACKEND_URL> ...
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the production bundle
RUN npm run build

# ===========================
# Stage 2: Serve with nginx
# ===========================
FROM nginx:1.29-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Default nginx command
CMD ["nginx", "-g", "daemon off;"]
