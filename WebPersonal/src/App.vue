<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <div class="app-container">
    <header class="app-header">
      <h1>Registro de Clientes</h1>
      <p class="subtitle">Sistema de gestión empresarial</p>
    </header>
    <main>
      <RegistroCliente />
    </main>
  </div>
</template>

<script>
import RegistroCliente from "./components/RegistroCliente.vue";

export default {
  components: { RegistroCliente },
};
</script>

<style>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-primary) 100%);
  padding: 2rem 1rem;
}

.app-header {
  text-align: center;
  color: var(--color-gray-900);
  margin-bottom: 2rem;
}

.app-header h1 {
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}
</style>



<!-- npm run dev -->