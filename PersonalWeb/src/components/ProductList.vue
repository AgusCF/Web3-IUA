<template>
  <v-container>
    <h2 class="text-h4 mb-4">Catálogo de Productos</h2>

    <!-- Búsqueda de productos -->
    <v-text-field
      v-model="searchQuery"
      label="Buscar productos"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      clearable
      class="mb-4"
    ></v-text-field>

    <!-- Mensaje de estado vacío -->
    <v-alert
      v-if="filteredProducts.length === 0"
      type="info"
      variant="tonal"
      border="start"
      class="mb-4"
    >
      No se encontraron productos que coincidan con tu búsqueda.
    </v-alert>

    <!-- Listado de productos -->
    <v-row>
      <v-col
        v-for="product in filteredProducts"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card
          :class="{ 'out-of-stock': product.stock === 0 }"
          height="100%"
          class="d-flex flex-column"
        >
          <v-card-title>{{ product.name }}</v-card-title>
          
          <v-card-text class="flex-grow-1">
            <div class="text-h5 mb-2">${{ product.price.toFixed(2) }}</div>
            
            <v-chip
              :color="product.stock > 0 ? 'success' : 'error'"
              size="small"
              class="mb-2"
            >
              {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock' }}
            </v-chip>
          </v-card-text>
          
          <v-card-actions>
            <v-btn
              color="primary"
              variant="elevated"
              block
              @click="addToCart(product.id)"
              :disabled="product.stock === 0 || getCartQuantity(product.id) >= product.stock"
            >
              <v-icon left>mdi-cart-plus</v-icon>
              Agregar al carrito
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from '@/data/products.js'
import { useCartStore } from '@/stores/cart'

// Store del carrito
const cartStore = useCartStore()

// Estado local para la búsqueda
const searchQuery = ref('')

/**
 * Filtra productos basado en la búsqueda.
 * Solo muestra productos cuyo nombre empieza por la consulta o contiene la palabra completa.
 */
const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products
  }
  const query = searchQuery.value.trim().toLowerCase()
  // Expresión regular: inicio de palabra (\b) seguido de la consulta
  const regex = new RegExp(`\\b${query}`, 'i')
  return products.filter(product =>
    regex.test(product.name.toLowerCase())
  )
})

/**
 * Agrega un producto al carrito
 */
function addToCart(productId) {
  cartStore.addToCart(productId)
}

/**
 * Devuelve la cantidad de un producto en el carrito
 * @param {Number} productId
 * @returns {Number}
 */
function getCartQuantity(productId) {
  const item = cartStore.items.find(i => i.id === productId)
  return item ? item.quantity : 0
}
</script>

<style scoped>
.out-of-stock {
  opacity: 0.7;
}
</style>
