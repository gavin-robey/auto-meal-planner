FROM node:22.13.1-alpine
RUN [ ! -e /lib/libssl.so.3 ] && ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3 || echo "Link already exists"
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]