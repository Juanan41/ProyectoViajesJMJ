# Proyecto Viajes JMJ

Aplicación de viajes con backend en Spring Boot y frontend en Angular.

## Estructura del proyecto

- `backend-miwi-ultimoback`: API REST con Spring Boot 3.2, Java 21, JPA y seguridad JWT.
- `frontend-miwi-ultimofront`: cliente web con Angular 21 y Tailwind CSS.

## Requisitos

### Backend

- Java 21
- Maven 3.9+ (o usar el wrapper `mvnw` / `mvnw.cmd`)
- Docker y Docker Compose (opcional para ejecutar PostgreSQL y el backend en contenedores)
- PostgreSQL 16 (solo si no se usa Docker)

### Frontend

- Node.js 18+ (compatible con Angular 21)
- npm 11.9.0 o superior
- Angular CLI 21 (se puede usar vía `npx @angular/cli`)

### Requisitos generales

- Git
- Conexión a Internet para descargar dependencias

## Configuración

### Backend

El backend usa las siguientes variables de entorno en `docker-compose.yml`:

- `PORT` - puerto en el contenedor (8080)
- `DB_URL` - URL de la base de datos PostgreSQL
- `DB_USERNAME` - usuario de la base de datos
- `DB_PASSWORD` - contraseña de la base de datos
- `APP_CORS_ALLOWED_ORIGINS` - orígenes permitidos para CORS
- `UNSPLASH_ACCESS_KEY` - clave de Unsplash para peticiones de imágenes

### Frontend

El frontend usa la URL de la API definida en `src/environments/environment.ts`:

- `apiUrl: 'http://localhost:8081/api'`

En producción, `src/environments/environment.prod.ts` apunta a:

- `apiUrl: 'https://proyectoviajesjmj.onrender.com/api'`

## Usuarios admin de prueba

Los siguientes usuarios están creados en la base de datos de demo y tienen rol `ADMIN`:

- `pablo@viajes.com`
- `jordi@viajes.com`
- `carlos@viajes.com`

Contraseña para cada cuenta:

- `1234`

> Estos usuarios se cargan desde `src/main/resources/data.sql` como usuarios administrativos de prueba.

## Ejecución local

### Iniciar el backend con Docker Compose

Desde `backend-miwi-ultimoback`:

```bash
cd backend-miwi-ultimoback
docker compose up --build
```

Esto iniciará:

- PostgreSQL en `localhost:5433`
- API backend en `http://localhost:8081`

### Iniciar el backend sin Docker

Desde `backend-miwi-ultimoback`:

```bash
cd backend-miwi-ultimoback
./mvnw clean package
java -jar target/viajesJMJ-0.0.1-SNAPSHOT.jar
```

El backend escuchará en `http://localhost:8080`.

### Iniciar el frontend

Desde `frontend-miwi-ultimofront`:

```bash
cd frontend-miwi-ultimofront
npm install
npm start
```

La aplicación web estará disponible en `http://localhost:4200`.

## Despliegue

### Backend

1. Construir el JAR:

```bash
cd backend-miwi-ultimoback
./mvnw clean package -DskipTests
```

2. Ejecutar el JAR:

```bash
java -jar target/viajesJMJ-0.0.1-SNAPSHOT.jar
```

3. O usar Docker:

```bash
cd backend-miwi-ultimoback
docker build -t viajesjmj-backend .
docker run -p 8080:8080 --env DB_URL=jdbc:postgresql://<host>:5432/viajesjmj --env DB_USERNAME=<usuario> --env DB_PASSWORD=<password> viajesjmj-backend
```

### Frontend

1. Construir la versión de producción:

```bash
cd frontend-miwi-ultimofront
npm install
npm run build
```

2. Servir los archivos estáticos generados en `dist/` con cualquier hosting estático (Netlify, Vercel, Firebase Hosting, Azure Static Web Apps, etc.).

3. Asegurar que en producción se use la URL correcta de la API backend en `environment.prod.ts`.

## Notas importantes

- El backend y el frontend deben apuntar al mismo backend API para funcionar correctamente.
- Si usas Docker Compose, el backend se expone en `http://localhost:8081`, mientras que la base de datos PostgreSQL queda en `localhost:5433`.
- En producción, actualiza las variables de entorno con valores seguros y no publicamos claves privadas en repositorios públicos.

---

### Contacto

Proyecto creado para el entorno de ViajesJMJ `Curso 2DAW`.
