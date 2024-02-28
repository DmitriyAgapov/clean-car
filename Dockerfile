FROM node:18-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
COPY --from=builder /app/build /home/site/
