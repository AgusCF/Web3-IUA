---
applyTo: '**'
---

# Contexto General y Guía de Desarrollo

## Contexto General
- Proyecto académico para la materia Web 3, enfocado en desarrollo full stack.
- El objetivo es aprender y practicar como un desarrollador full stack profesional, preparándote para el mundo laboral.
- No tienes experiencia previa en el rol, por lo que se requiere explicaciones claras y preparación para desempeñarte en ese puesto.

## Entorno de Trabajo
- **Metodología:** SCRUM
- **Sistema Operativo:** Windows 11
- **IDE:** Visual Studio Code
- **Plugins:** Volar (Vue), ESLint, Prettier, GitLens (preferencia por GitHub Desktop)
- **Frameworks/Librerías:** Vue.js 3, Vuetify 3, Vue Router, Pinia, Axios (para futuro backend)
- **Arquitectura:** 
    - src/
        - assets/
        - components/
        - data/ (simulación de backend en archivos JS)
        - layouts/
        - pages/
        - store/
        - router/
        - services/
        - utils/
        - App.vue
- **Patrones recomendados:** Composición con componentes, Service Layer, State Management con Pinia, Arquitectura en Capas.
- **Versionado:** GitHub + GitFlow (main, develop, feature, release, hotfix). Convención de commits clara.
- **Testing:** Jest o Vitest + Vue Testing Library (agregar cuando el componente funcione).
- **Documentación:** README.md trabajado + Wiki ligera.

## Proyecto y Ejercicios
- **Funcionalidad principal:** Registro rápido de clientes en una tienda (input + confirmación + simulación de guardado).
- **Ejercicios adicionales:** Listado de productos con búsqueda, carrito mínimo, validación en registro de clientes, integración de Vue Router con vistas y rutas dinámicas.

## Requerimientos y Buenas Prácticas
- El código debe ser autodocumentado y seguir las convenciones del entorno.
- Utilizar Vuetify, Vue Router y Pinia según lo definido.
- Si se usa algo fuera del stack, justificar y explicar la decisión.
- Separar datos simulados en archivos JS (por ejemplo, productos.js), no hardcodear en componentes.
- Marcar claramente dónde irán futuras conexiones al backend.
- Ser claro, profesional y didáctico en las respuestas y recomendaciones.
- Testing se agrega una vez que el componente esté funcionando.

## Aclaraciones Importantes
- Actualmente no hay backend, pero se debe dejar preparado el código para futuras integraciones.
- Los datos deben importarse desde archivos JS en la carpeta data/.
- Los casos de testing se implementarán después de tener los componentes funcionales.

## Sugerencias y Comentarios
- Mantener la estructura modular y reutilizable de los componentes.
- Priorizar la claridad y la mantenibilidad del código.
- Documentar bien cada parte del código y los archivos principales.
- Recomendar mejoras o buenas prácticas cuando sea relevante.
- Preparar el proyecto para una futura integración con backend y pruebas automatizadas.

---

**Nota:** Este archivo sirve como guía para cualquier desarrollador o IA que trabaje en el proyecto, asegurando coherencia, profesionalismo y preparación para el entorno laboral real.