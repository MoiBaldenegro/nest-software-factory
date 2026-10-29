# Tarea: Limpiar artefactos de la factory

## Objetivo
Dejar el proyecto en un estado limpio y funcional después de las pruebas de la
factory.

## Criterios de aceptación
1. Eliminar `factory/tasks/test-validation-failure.md`.
2. Eliminar cualquier prueba deliberadamente fallida o de diagnóstico que haya
   sido añadida para probar la validación automática.
3. Conservar las pruebas funcionales reales y el endpoint `/ping`.
4. Las pruebas, el lint y el build deben pasar.
5. No modificar la configuración de CI ni la implementación de la factory salvo
   que sea necesario para corregir un problema directamente relacionado.
6. No hacer push ni merge.

## Limpieza de worktrees y ramas
Los worktrees y ramas locales `factory/*` no pueden eliminarse desde el
worktree en el que se ejecuta esta tarea. Después de revisar y aceptar los
cambios, ejecutar desde el worktree principal (`main`):

```bash
git worktree remove ../nest-software-factory-factory-add-ping-endpoint
git worktree remove ../nest-software-factory-factory-test-validation-failure
git branch -D factory/add-ping-endpoint
git branch -D factory/test-validation-failure
```

Solo ejecutar los comandos de limpieza para worktrees y ramas que existan y
que ya no contengan trabajo que deba conservarse.

## Validación
- Ejecutar `pnpm run lint`.
- Ejecutar `pnpm exec jest --runInBand`.
- Ejecutar `pnpm run build`.
- Informar los archivos eliminados, los cambios conservados y los resultados.
