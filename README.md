## Project Structure

- frontend: Contains the React application.

- backend: Houses the Laravel application.

- docker-compose.yaml: File for orchestrating and deploying the services.

- Dockerfiles: Location for storing all the necessary configuration files.

### Dockerize the React project

- Cloning the Project:
       Clone the React project repository from your version control system (e.g., Git):
```bash
git clone https://github.com/rockstban/react-docker.git
```
![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/1.png)

We change the configuration file exactly as shown in the image to the following:

```bash
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
 base: "/",
 plugins: [react()],
 preview: {
  port: 3000,
  strictPort: true,
 },
 server: {
  port: 3000,
  strictPort: true,
  host: true,
  origin: "http://0.0.0.0:3000",
 },
});
```

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/2.png)

This configuration defines how Vite should build and deploy the application. It includes the base path configuration, necessary plugins for React, and server configuration, which uses port 3000 for the web application.



![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/3.png)

After updating the Vite configuration, the next step is to create a Dockerfile to dockerize the React application and build its corresponding Docker image.

```bash
FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]

```

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/4.png)

After having created the Dockerfile, we use the docker build command to build the image. Once the image has been successfully built, we can upload it to Docker Hub repository or to a private repository such as Amazon ECR (Elastic Container Registry) on AWS.

## INSTANCE IN AZURE AND DNS

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/5.png)

The next step is to create a virtual machine where we will deploy the application using containers.

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/6.png)


Once the instance is running, we need to locate the public IP address and copy it to register it in the DNS ( GoDaddy).

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/7.png)

Here we will register our instance's IP address so that we can use a domain name.

## TRAEFIK

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/8.png)

The first step here is to install Apache2 so that we can create a username and password for monitoring using Traefik.

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/9.png)

We generate a username and password which we will use later.

We create a configuration file named traefik.toml which will contain all the following configuration:


```bash

[entryPoints]
  [entryPoints.web]
    address = ":80"
    [entryPoints.web.http.redirections.entryPoint]
      to = "websecure"
      scheme = "https"

  [entryPoints.websecure]
    address = ":443"

[api]
  dashboard= true

[certificatesResolvers.lets-encrypt.acme]
  email = "loesteban2422@gmail.com"
  storage = "acme.json"
  [certificatesResolvers.lets-encrypt.acme.tlsChallenge]

[providers.docker]
  watch = true
  network = "web"

[providers.file]
  filename = "traefik_dynamic.toml"

```

As the next step, another configuration file is created, this time named traefik_dynamic.toml:

```bash

[http.middlewares.simpleAuth.basicAuth]
  users = [
    "Insert the username and password generated earlier"
  ]
  [http.routers.api]
    rule = "Host(`monitor.estebanpro.online`)"
    entrypoints = ["websecure"]
    middlewares = "simpleAuth"
    service = "api@internal"
    [http.routers.api.tls]
      certResolver = "lets-encrypt"
```

![](https://github.com/rockstban/react-docker/blob/main/Dockerfiles/images/10.png)

Create an empty file and grant it read and write permissions.

Next, create a first Docker-compose file named traefik-docker-compose.yaml with the following configuration:

```bash

version: '3'
networks:
  web:
    external: true
services:
  traefik:
    image: traefik:v3.0
    ports:
      - "80:80"
      - "443:443"
    networks:
      - "web"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "./traefik.toml:/traefik.toml"
      - "./traefik_dynamic.toml:/traefik_dynamic.toml"
      - "./acme.json:/acme.json"
```

Finally, we just need to create the second Docker-compose file for the application.

```bash

version: '3'
services:
  angular:
    image: rockstban/app-esteban:latest
    labels:
      - traefik.http.routers.angular.rule=Host(`angular.estebanpro.online`)
      - traefik.http.routers.angular.tls=true
      - traefik.http.routers.angular.tls.certresolver=lets-encrypt
      - traefik.port=80
    networks:
      - internal
      - web
    ports:
      - 3000:3000
networks:
  web:
    external: true
  internal:
    driver: bridge

```

### Final Commands

The following commands are used to start up the application:

```bash
sudo docker-compose -f traefik-docker-compose.yaml up -d
sudo docker-compose up -d

```

NOTE
TO EXPOSE THE APPLICATION TO THE INTERNET, WE MUST CREATE AN INBOUND RULE ON THE PORT IN AZURE SO THAT WE CAN VIEW THE APP.

## Watch the video step by step 

Thank you for being here. I hope to help you. If you're interested, you can watch the following video where I explain this process more thoroughly

[Click here to watch the video tutorial!!](https://youtu.be/nktLSjQbi98)















