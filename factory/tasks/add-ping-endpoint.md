# Tarea: Añadir endpoint de ping

## Objetivo
Añadir un endpoint `GET /ping` para comprobar rápidamente que la API responde.

## Criterios de aceptación
1. `GET /ping` devuelve un código HTTP 200.
2. La respuesta tiene formato JSON.
3. La respuesta contiene exactamente el campo `message` con el valor `"pong"`.
4. Incluir una prueba automatizada para el endpoint.
5. Las rutas existentes (`/`, `/health` y `/version`) deben mantener su comportamiento actual.
6. Las pruebas existentes deben seguir pasando correctamente.

## Restricciones
- Seguir las convenciones de NestJS existentes.
- Examinar el repositorio antes de realizar cambios.
- No añadir dependencias.
- No exponer variables de entorno ni secretos.
- No modificar lógica no relacionada con esta tarea.

## Validación
- Ejecutar las pruebas pertinentes.
- Ejecutar el linter si está disponible.
- Realizar la compilación para producción.
- Informar sobre los archivos modificados y los resultados de la validación.
