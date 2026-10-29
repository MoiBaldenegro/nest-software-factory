# Tarea: Añadir endpoint de readiness

## Objetivo
Añadir un endpoint pequeño para indicar que la aplicación está lista para
recibir solicitudes.

## Criterios de aceptación
1. Añadir `GET /ready`.
2. El endpoint debe devolver HTTP 200.
3. La respuesta debe ser exactamente:

   ```json
   { "status": "ready" }
   ```

4. Implementar la lógica siguiendo las convenciones actuales de
   `AppController` y `AppService`.
5. Añadir una prueba automatizada para el nuevo comportamiento.
6. Las rutas existentes (`/`, `/health`, `/version` y `/ping`) deben conservar
   su comportamiento.
7. No añadir dependencias.

## Reparación
Si lint, tests o build fallan, diagnosticar la salida completa y corregir la
causa sin eliminar pruebas ni debilitar sus aserciones. La implementación final
debe dejar todas las validaciones pasando.

## Validación
- Ejecutar `pnpm run lint`.
- Ejecutar `pnpm exec jest --runInBand`.
- Ejecutar `pnpm run build`.
- Informar los archivos modificados y los resultados.
