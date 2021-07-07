FROM node:13.12.0-alpine as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json /app/
RUN npm install --silent
COPY . /app
ENV PORT=3001
ENV REACT_APP_GATEWAY=nistagram-gateway:9092
RUN react-scripts build

FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]