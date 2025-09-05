<script setup>
import { ref } from 'vue'

const clientName = ref('')
const showMessage = ref(false)
const welcomeMessage = ref('')

const registerClient = () => {
  if (!clientName.value.trim()) {
    return
  }
  
  // Simular guardado en base de datos
  console.log('Cliente registrado:', clientName.value)
  
  welcomeMessage.value = `¡Bienvenido/a ${clientName.value}!`
  showMessage.value = true
  
  // Limpiar el campo después de 3 segundos
  setTimeout(() => {
    clientName.value = ''
    showMessage.value = false
  }, 3000)
}
</script>

<template>
  <v-container>
    <v-card class="mx-auto pa-4" max-width="500">
      <v-card-title class="text-h5 mb-4">
        Registro Rápido de Cliente
      </v-card-title>
      
      <v-form @submit.prevent="registerClient">
        <v-text-field
          v-model="clientName"
          label="Nombre del cliente"
          :rules="[v => !!v || 'El nombre es requerido']"
          required
          clearable
          variant="outlined"
          prepend-icon="mdi-account"
        ></v-text-field>

        <v-btn
          color="primary"
          block
          type="submit"
          :disabled="!clientName"
          class="mt-4"
        >
          Registrar Cliente
        </v-btn>
      </v-form>

      <v-fade-transition>
        <v-alert
          v-if="showMessage"
          color="success"
          class="mt-4"
          variant="tonal"
          border="start"
        >
          {{ welcomeMessage }}
        </v-alert>
      </v-fade-transition>
    </v-card>
  </v-container>
</template>