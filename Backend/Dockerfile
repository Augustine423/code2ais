FROM node:18-alpine
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend ./
EXPOSE 4000
CMD ["node", "index.js"]
