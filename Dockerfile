# === STAGE 1: Build Frontend ===
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY amazon-frontend/package*.json ./
RUN npm install
COPY amazon-frontend/ ./
RUN npm run build

# === STAGE 2: Run Backend ===
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY amazon-backend/package*.json ./
RUN npm install --only=production
COPY amazon-backend/ ./
COPY --from=frontend-builder /app/frontend/build ./public
EXPOSE 5000
CMD ["node", "server.js"]
