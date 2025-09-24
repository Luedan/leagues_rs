FROM node:20-alpine AS build
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install --frozen-lockfile
ARG VITE_API_USERNAME
ARG VITE_API_PASSWORD
ENV VITE_API_USERNAME=$VITE_API_USERNAME
ENV VITE_API_PASSWORD=$VITE_API_PASSWORD

RUN pnpm run build

FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build/client .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]