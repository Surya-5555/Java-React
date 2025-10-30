# Mental Health Backend (Spring Boot)

This folder contains a Spring Boot backend scaffold for the Mental Health Check-in app.

Quick setup

1. Ensure PostgreSQL is running and a database named `mental_health` exists.
2. Update `src/main/resources/application.properties` if your DB host/credentials differ.
3. Build and run:

```powershell
cd backend
mvn clean package
mvn spring-boot:run
```

API (basic)

- POST /api/auth/register  { username, password, fullName }
- POST /api/auth/login     { username, password } -> { token }
- POST /api/moods         (Auth Bearer) create mood
- GET  /api/moods         (Auth Bearer) list moods for current user

Notes

- JWT secret is in `application.properties` (replace for production).
- Spring JPA is configured with `ddl-auto=update` for development.
