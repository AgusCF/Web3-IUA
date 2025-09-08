<!-- filepath: src/components/QuickRegister.vue -->
<template>
  <v-card class="mx-auto my-4 pa-4" max-width="500">
    <v-card-title class="text-h5">
      Registro Rápido de Clientes
    </v-card-title>
    
    <v-card-text>
      <v-form @submit.prevent="registerNewCustomer">
        <v-text-field
          v-model="customerName"
          label="Nombre del cliente"
          :error-messages="nameError"
          :class="{ 'border-error': nameError }"
          @input="clearSuccess"
          variant="outlined"
          autofocus
        ></v-text-field>
        
        <v-alert
          v-if="successMessage"
          type="success"
          variant="tonal"
          class="mb-4"
        >
          {{ successMessage }}
        </v-alert>
        
        <v-alert
          v-if="customerStore.error"
          type="error"
          variant="tonal"
          class="mb-4"
        >
          {{ customerStore.error }}
        </v-alert>
        
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="customerStore.isLoading"
          :disabled="!isValid"
        >
          Registrar Cliente
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCustomerStore } from '@/stores/customer'

// Initialize customer store
const customerStore = useCustomerStore()

// Form state
const customerName = ref('')
const successMessage = ref('')

// Computed properties
const nameError = computed(() => {
  if (customerName.value && customerName.value.trim().length < 3) {
    return 'El nombre debe tener al menos 3 caracteres'
  }
  return ''
})

const isValid = computed(() => {
  return customerName.value && customerName.value.trim().length >= 3
})

// Methods
/**
 * Register a new customer when form is submitted
 */
async function registerNewCustomer() {
  if (!isValid.value) return
  
  const result = await customerStore.registerCustomer({ 
    name: customerName.value 
  })
  
  if (result) {
    successMessage.value = `¡Bienvenido, ${result.name}!`
    customerName.value = '' // Clear input after successful registration
  }
}

/**
 * Clear success message when user starts typing again
 */
function clearSuccess() {
  if (successMessage.value) {
    successMessage.value = ''
  }
}
</script>

<style scoped>
.border-error {
  border-color: var(--v-error-base);
}
</style>