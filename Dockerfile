# Debian-based Node image avoids native-module compatibility problems that can
# occur with Alpine/musl builds (for example, image-processing dependencies).
FROM node:20-bookworm-slim
WORKDIR /app

# package.json runs scripts/setup.js as a postinstall hook. Copy that hook
# before installing dependencies; the rest of the compact release can still
# be copied afterwards so dependency layers remain cacheable.
COPY package*.json ./
COPY scripts/setup.js ./scripts/setup.js
RUN npm ci --omit=dev --no-audit --no-fund

COPY . .

# expose the keep-alive port
EXPOSE 3000

CMD ["node", "index.js"]
