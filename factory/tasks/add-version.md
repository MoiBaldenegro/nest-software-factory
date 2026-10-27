# Tarea: Añadir endpoint de versión de la API

## Objetivo
Añadir un endpoint `GET /version` a la API de NestJS.

## Criterios de aceptación
1. `GET /version` devuelve un código HTTP 200.
2. La respuesta tiene formato JSON.
3. La respuesta contiene un campo `version`.
4. La versión se obtiene del archivo `package.json`.
5. Incluir pruebas automatizadas para el endpoint.
6. El comportamiento actual del *health check* (verificación de estado) permanece sin cambios.
7. Las pruebas existentes deben seguir pasando correctamente.

## Restricciones
- Seguir la arquitectura de NestJS existente.
- Examinar el repositorio antes de realizar cambios.
- Reutilizar las convenciones existentes.
- No añadir dependencias.
- No exponer variables de entorno ni secretos.
- No modificar lógica de negocio ajena a esta tarea.

## Validación
- Ejecutar las pruebas pertinentes.
- Ejecutar el *linter* (si está disponible).
- Realizar la compilación para producción (*production build*).
- Informar sobre los archivos modificados y los resultados de la validación.