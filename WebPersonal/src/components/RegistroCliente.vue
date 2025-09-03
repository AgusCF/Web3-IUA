<template>
  <div class="registro-container">
    <div class="form-header">
      <i class="fas fa-user-plus"></i>
      <h2>Nuevo Cliente</h2>
    </div>

    <div class="input-group">
      <label for="nombreCliente">Nombre completo</label>
      <input
        id="nombreCliente"
        type="text"
        v-model="nombreCliente"
        placeholder="Ej: Juan Pérez"
        class="input"
      />
    </div>

    <button 
      class="button button-primary"
      :class="{ 'button-disabled': !nombreCliente.trim() }"
      @click="registrarCliente"
    >
      <i class="fas fa-save"></i>
      Registrar Cliente
    </button>

    <transition name="fade">
      <div v-if="mensajeBienvenida" 
           :class="['mensaje', mensajeBienvenida.includes('⚠️') ? 'mensaje-error' : 'mensaje-success']">
        {{ mensajeBienvenida }}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "RegistroCliente",

  data() {
    return {
      nombreCliente: "", // Estado enlazado al input
      mensajeBienvenida: "", // Mensaje mostrado tras registrar
    };
  },

  methods: {
    registrarCliente() {
      if (this.nombreCliente.trim() !== "") {
        // 1. Mostrar mensaje en la interfaz
        this.mensajeBienvenida = `✅ Bienvenido, ${this.nombreCliente}!`;

        // 2. Simular guardado en "base de datos"
        console.log(`Cliente registrado: ${this.nombreCliente}`);

        /* 
        Aquí luego se conectaría al Back-End usando fetch o Axios.
        Ejemplo:
        fetch("https://tu-backend.com/api/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre: this.nombreCliente }),
        })
        .then(res => res.json())
        .then(data => console.log("Guardado en el servidor", data));
        */

        // 3. Resetear el input
        this.nombreCliente = "";
      } else {
        this.mensajeBienvenida = "⚠️ Por favor, ingrese un nombre válido.";
      }
    },
  },
};
</script>

<style scoped>
.registro-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header i {
  font-size: 2rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.form-header h2 {
  margin: 0;
  color: var(--color-gray-800);
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-gray-700);
  font-weight: 500;
}

.input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid var(--color-gray-200);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-light);
}

.button {
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button i {
  font-size: 1.1rem;
}

.button-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.mensaje {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.mensaje-success {
  background: var(--color-accent-light);
  color: var(--color-accent-dark);
}

.mensaje-error {
  background: #FEE2E2;
  color: var(--color-error);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
