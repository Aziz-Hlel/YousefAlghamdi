FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 5000

# the reason for the sh -c is Sometimes Node in Alpine doesn't handle signals properly unless it’s through a shell.
CMD ["sh", "-c", "npm run dev-docker"]