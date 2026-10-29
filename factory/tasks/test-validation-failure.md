# Tarea de prueba: provocar un fallo de validación

## Objetivo
Introducir temporalmente una prueba que falle para comprobar que el script de
validación ejecuta todas las comprobaciones y recopila los errores.

## Criterios de aceptación
1. Añadir una prueba automatizada en `src/app.controller.spec.ts`.
2. La prueba debe fallar deliberadamente mediante una aserción incorrecta.
3. No modificar la implementación de la aplicación.
4. No corregir la prueba en esta tarea.

## Restricciones
- Esta tarea es únicamente para probar el flujo de validación.
- No añadir dependencias.
- No exponer variables de entorno ni secretos.

## Resultado esperado
- El lint debe ejecutarse.
- Los tests deben fallar.
- El build debe ejecutarse de todos modos.
- El proceso de validación debe terminar con código de salida distinto de cero
  e informar el fallo de los tests.
