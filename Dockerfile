FROM public.ecr.aws/docker/library/node:latest 
# Declare build arguments
ARG APP_VERSION
# Use build arguments as needed
ENV APP_VERSION=$APP_VERSION
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g typescript
COPY . .
RUN tsc  && cp -r ./src/blok-dev-firebase-adminsdk-ccra4-d37ca30d5e.json ./build
CMD ["npm", "start"]
