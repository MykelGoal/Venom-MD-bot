FROM node:20-alpine
WORKDIR /app

# install deps first for better caching
COPY package*.json ./
RUN npm install --omit=dev

COPY . .

# expose the keep-alive port
EXPOSE 3000

CMD ["node", "index.js"]
