# back_DevSecOps
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=javierm-0_back_DevSecOps&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=javierm-0_back_DevSecOps)
#
<!-- Badge de estado del workflow SonarCloud -->
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=javierm-0_back_DevSecOps&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=javierm-0_back_DevSecOps)
https://sonarcloud.io/api/project_badges/measure?project=javierm-0_back_DevSecOps&metric=vulnerabilities
Test

API REST para la aplicación DevSecOps, construida con NestJS.

Provee endpoints para autenticación, gestión de usuarios y citas, conectándose a una base de datos MongoDB.

## Ejecución local

1. Copia `.env-example` como `.env` y ajusta las variables necesarias.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el backend:
   ```bash
   npm run start:dev
   ```

## Ejecución con Docker

1. Copia `.env-example` como `.env` y ajusta las variables necesarias.
2. Construye y levanta los servicios:
   ```bash
   docker compose up --build
   ```

Esto levantará el backend y una base de datos MongoDB en contenedores.

## Variables de entorno requeridas

- `MONGO_URI` (ejemplo: `mongodb://mongo:27017/devsecops`)
- `SECRET` (clave secreta para JWT)
- `FRONTEND_IP` (ejemplo: `http://localhost:8080`)

Consulta `.env-example` para más detalles.

