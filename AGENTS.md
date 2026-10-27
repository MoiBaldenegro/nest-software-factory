
# AGENTS.md

# Reglas de ingeniería

## Proyecto
- Se trata de una aplicación NestJS desarrollada en TypeScript.
- Usaremos arquitectura hexagonal, bounded context, y DDD con servicios de dominio.


## Implementación
- Implementa únicamente la funcionalidad solicitada.
- Añade o actualiza pruebas automatizadas cuando se produzcan cambios en el comportamiento.
- No modifiques archivos que no estén relacionados.
- No añadidas dependencias a menos que sea estrictamente necesario.
- No incluyas credenciales, tokens o secretos codificados de forma fija (hardcoded).

## Validación
- Ejecuta las pruebas correspondientes.
- Ejecuta el comando de linting del proyecto, si está disponible.
- Realiza la compilación para producción (production build).
- Informa sobre cada comando ejecutado y su resultado.
- Nunca afirmes que una prueba ha pasado si no se ha ejecutado correctamente.

## Seguridad
- Nunca accedas a credenciales de producción.
- Nunca realices despliegues en el entorno de producción.
- Nunca elimines bases de datos ni datos de producción.
- No debilites las pruebas ni los controles de seguridad para lograr que una compilación pase.
- Si encuentras algún impedimento, detente y explícalo en lugar de inventar una solución improvisada.