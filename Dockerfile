# Base image for Node.js (shared stage)
FROM node:18-alpine as base
WORKDIR /app

# Dockerfile for the backend and frontend
# Backend Build Stage
FROM base as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./
# The backend will run on port 8080
EXPOSE 8080
CMD ["npm", "start"]

# Frontend Build Stage
FROM base as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Production Build - Combine Backend and Frontend
FROM base as production
WORKDIR /app

# Copy the backend
COPY --from=backend /app/backend /app/backend

# Copy the built frontend to serve as static files
COPY --from=frontend /app/frontend/dist /app/frontend/dist

# Set up the command to start the backend
WORKDIR /app/backend
CMD ["npm", "start"]
