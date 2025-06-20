# Dockerfile for NestJS backend with production-ready settings
FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

# Production image
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
