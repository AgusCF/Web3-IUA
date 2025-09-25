<!-- filepath: src/views/ClientesView.vue -->
<template>
  <v-container>
    <h2 class="text-h4 font-weight-bold mb-4">Listado de Clientes</h2>

    <v-text-field
      v-model="search"
      label="Buscar cliente"
      prepend-inner-icon="mdi-magnify"
      clearable
      class="mb-4"
    />

    <v-alert
      v-if="filteredCustomers.length === 0"
      type="info"
      variant="tonal"
      border="start"
      class="mb-4"
    >
      No se encontraron clientes que coincidan con la búsqueda.
    </v-alert>

    <v-table v-if="filteredCustomers.length > 0" class="elevation-2">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Fecha de registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in filteredCustomers" :key="cliente.id">
          <td>{{ cliente.name }}</td>
          <td>{{ formatDate(cliente.registeredAt) }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { customers } from '@/data/customers.js'

const search = ref('')

/**
 * Filtra clientes por nombre (case-insensitive, inicio de palabra)
 */
const filteredCustomers = computed(() => {
  if (!search.value) return customers
  const query = search.value.trim().toLowerCase()
  const regex = new RegExp(`\\b${query}`, 'i')
  return customers.filter(c => regex.test(c.name.toLowerCase()))
})

/**
 * Formatea la fecha a formato legible
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>