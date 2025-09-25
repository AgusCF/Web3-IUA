# Web3
# PersonalWeb — Proyecto Académico Web 3

---

## Índice

- Descripción General
- Entorno de Desarrollo
- Arquitectura del Proyecto
- Estructura de Carpetas
- Principales Componentes y Vistas
- Gestión de Estado y Servicios
- Ruteo y Navegación
- Autenticación y Seguridad
- Testing y Calidad
- Versionado y Flujo de Trabajo
- Simulación de Backend
- Guía de Uso
- Credenciales de Prueba
- Recomendaciones y Buenas Prácticas
- Contacto y Contribuciones

---

## Descripción General

**PersonalWeb** es un proyecto académico desarrollado para la materia Web 3, orientado a la práctica profesional del desarrollo full stack con Vue.js 3. El objetivo es consolidar conocimientos en arquitectura moderna, gestión de estado, ruteo, autenticación y buenas prácticas de desarrollo, simulando un entorno laboral real bajo metodología SCRUM.

---

## Entorno de Desarrollo

- **Metodología:** SCRUM
- **IDE:** Visual Studio Code
- **Plugins recomendados:**
  - Volar (Vue)
  - ESLint y Prettier (estandarización de código)
  - GitLens (historial y anotaciones Git)
  - GitHub Desktop (para manejo de versiones)
- **Frameworks y Librerías:**
  - Vue.js 3 (framework principal)
  - Vuetify 3 (UI kit moderno)
  - Vue Router (navegación entre vistas)
  - Pinia (manejo de estado global)
  - Axios (para integración futura con backend) *Todavia no implementado*
- **Testing:** Vitest + Vue Testing Library (unitario), Cypress (end-to-end, sugerido por el docente)
- **Linting/Formatting:** ESLint + Prettier (pre-commit hook con Husky)

---

## Arquitectura del Proyecto

El proyecto sigue una **arquitectura en capas** y patrones como:

- **Composición con componentes:** UI dividida en componentes pequeños y reutilizables.
- **Service Layer:** Lógica de negocio y acceso a datos aislada en stores y servicios.
- **State Management:** Pinia centraliza el estado global, evitando props excesivos.
- **Separación de responsabilidades:** Vistas, lógica y datos bien diferenciados.

---

## Estructura de Carpetas

```
src/
 ├── assets/        # Imágenes, íconos, estilos globales
 ├── components/    # Componentes reutilizables (ProductList, ShoppingCart, QuickRegister, Footer)
 │   └── __tests__/ # Tests unitarios de componentes
 ├── data/          # Simulación de backend en archivos JS (products.js, customers.js)
 ├── layouts/       # Plantillas (navbar, sidebar, footer)
 ├── pages/         # Vistas completas (Home, Login, Registro) [*ver nota]
 ├── router/        # Configuración de Vue Router (index.js)
 ├── services/      # API calls (preparado para integración futura)
 ├── stores/        # Estado global con Pinia (auth.js, cart.js, customer.js)
 ├── utils/         # Funciones auxiliares (helpers, validaciones)
 ├── views/         # Vistas principales (RegisterView, ProductsView, ProductDetailView, ClientesView, LoginView)
 └── App.vue        # Componente raíz
```
> **Nota:** Las vistas están en `src/views/` siguiendo la convención de Vue 3.

---

## Simulación de Backend

Actualmente **no hay backend real**.  
Los datos se simulan en archivos JS dentro de `/src/data`:
- **products.js:** Lista de productos con `{ id, name, price, stock }`
- **customers.js:** Lista de clientes con `{ id, name, registeredAt }`

Esto permite separar la lógica de presentación de los datos y preparar el proyecto para una futura integración con API REST usando Axios.

---

## Principales Componentes y Vistas

### **ProductList.vue**
- Renderiza la lista de productos desde `/data/products.js`.
- Búsqueda case-insensitive por nombre (inicio de palabra).
- Estado vacío y flag visual para productos sin stock.
- Botón “Agregar al carrito” (deshabilitado si no hay stock suficiente).
- Navegación programática al detalle de producto.

### **ShoppingCart.vue**
- Muestra los productos agregados al carrito.
- Permite modificar cantidades (+/−), elimina al llegar a 0.
- Calcula subtotal y total general de forma reactiva.
- Mensaje si el carrito está vacío.

### **QuickRegister.vue**
- Formulario de registro rápido de clientes.
- Validación mínima (nombre ≥ 3 caracteres).
- Feedback visual de éxito/error.
- Simulación de guardado en consola.

### **ClientesView.vue**
- Listado de clientes desde `/data/customers.js`.
- Búsqueda por nombre.
- Estado vacío si no hay resultados.
- Preparado para futuras funcionalidades (alta, edición, eliminación).

### **ProductDetailView.vue**
- Vista dinámica `/productos/:id`.
- Muestra detalles del producto seleccionado.
- Manejo de error si el producto no existe.
- Botón para volver a la lista y restaurar scroll.

### **LoginView.vue**
- Pantalla de login con Vuetify.
- Validación de email y contraseña (≥ 6 caracteres).
- Feedback de error, accesibilidad y UX profesional.
- Persistencia de sesión en localStorage.

### **Footer.vue**
- Pie de página reutilizable.

---

## Gestión de Estado y Servicios

- **Pinia:**  
  - auth.js: Autenticación, persistencia de sesión, login/logout.
  - `cart.js`: Carrito de compras, gestión de ítems y totales.
  - `customer.js`: Registro y listado de clientes.

- **Service Layer:**  
  - Preparado para integración con Axios y backend real.
  - Los datos simulados se importan desde `/data/`.

---

## Enrutamiento (Vue Router)

- **Rutas principales:**
  - `/` (Inicio/Registro)
  - `/login` (Login)
  - `/productos` (Listado de productos)
  - `/productos/:id` (Detalle dinámico)
  - `/clientes` (Listado de clientes)
- **Guardas globales:**  
  - Redirige a `/login` si la ruta requiere autenticación y el usuario no está logueado.
  - Evita acceder a `/login` si ya hay sesión activa.
- **Enlaces activos destacados** en la barra de navegación.
- **Restauración de scroll** al navegar entre vistas.

---

## Autenticación y Seguridad

- **Login simulado:**  
  - Email: `admin@web3.com` | Password: `123456`
  - Email: `alumno@web3.com` | Password: `alumno123`
- **Persistencia:**  
  - El usuario se guarda en localStorage y se restaura al recargar.
- **Logout:**  
  - Botón “Salir” en la barra superior, muestra el email del usuario activo.

---

## Testing

- **Unitario:**  
  - Vitest + Vue Testing Library para componentes principales. (Tiene fallos por tema de dependencias, lo que no permite correrlos)
- **End-to-end:**  
  - Cypress (sugerido por el docente, no implementado aún).
- **Linting/Formatting:**  
  - ESLint + Prettier configurados en pre-commit hook (Husky).

---

## Futuras Mejoras

- Integración con backend real usando Axios.
- Ampliar cobertura de tests (unitarios y end-to-end).
- Mejorar documentación y agregar Wiki en GitHub.
- Implementar funcionalidades avanzadas (edición/eliminación de clientes, checkout de carrito, etc.).

---

## Créditos y Autoría

Proyecto realizado por Agustin Cardetti Facchin para la materia Web 3, Universidad Instituto Universitario Aeronautico (IUA), año 2025.

---

## Contacto

Para dudas, sugerencias o mejoras, puedes abrir un issue en el repositorio.




