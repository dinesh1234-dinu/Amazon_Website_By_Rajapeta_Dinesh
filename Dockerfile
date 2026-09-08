# === STAGE 1: Build React Frontend with Node 16 ===
FROM node:16-alpine AS frontend-builder
WORKDIR /app/frontend
COPY amazon-frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY amazon-frontend/ ./
ENV CI=false
RUN npm run build

# === STAGE 2: Run Express Backend with Node 18 ===
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY amazon-backend/package*.json ./
RUN npm install --omit=dev --legacy-peer-deps
COPY amazon-backend/ ./
COPY --from=frontend-builder /app/frontend/build ./public
EXPOSE 5000
CMD ["node", "server.js"]
