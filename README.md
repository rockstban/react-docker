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






