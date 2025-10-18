# Stage 1: Build React frontend
FROM node:20-alpine AS frontend-build

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Backend + serve frontend
FROM node:20-alpine

WORKDIR /app

# Copy backend package.json and install only production dependencies
COPY server/package*.json ./
RUN npm install --production

# Copy backend source code
COPY server/ ./

# Copy React build into backend "public" folder
COPY --from=frontend-build /app/client/build ./public

# Expose port for Cloud Run
EXPOSE 8080
ENV PORT=8080

# Start backend
CMD ["node", "ImageRender.js"]
