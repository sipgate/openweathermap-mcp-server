
# ----------- Build Stage -----------
FROM node:24-alpine AS build

# Set working directory
WORKDIR /app

# Install all dependencies (including dev)
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript
RUN npm run build

# ----------- Production Stage -----------
FROM node:24-alpine AS prod

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json for prod install
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy built app from build stage
COPY --from=build /app/dist ./dist

# If you need any other static assets, copy them here as well
# COPY --from=build /app/public ./public

# Expose port
EXPOSE 3000

# Set environment variable for OpenWeatherMap API key
ENV OWM_API_KEY=

# Start the server
CMD ["node", "dist/main.js"]
