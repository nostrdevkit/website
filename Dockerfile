FROM node:22-alpine

WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

CMD ["npm", "run", "build"]
