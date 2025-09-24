<!-- filepath: src/views/ProductDetailView.vue -->
<template>
  <v-container>
    <v-btn
      variant="text"
      prepend-icon="mdi-arrow-left"
      class="mb-4"
      @click="goBack"
    >
      Volver a productos
    </v-btn>

    <v-alert
      v-if="!product"
      type="error"
      variant="tonal"
      class="my-8"
    >
      Producto no encontrado.
    </v-alert>

    <v-card
      v-else
      class="mx-auto"
      max-width="500"
      elevation="8"
    >
      <v-card-title class="text-h5">{{ product.name }}</v-card-title>
      <v-card-text>
        <div class="text-h6 mb-2">Precio: ${{ product.price.toFixed(2) }}</div>
        <v-chip
          :color="product.stock > 0 ? 'success' : 'error'"
          class="mb-2"
        >
          {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock' }}
        </v-chip>
        <div class="mt-4">
          <strong>ID:</strong> {{ product.id }}
        </div>
        <!-- Aquí puedes agregar más detalles si tuvieras más campos -->
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          :disabled="product.stock === 0"
          @click="addToCart(product.id)"
        >
          <v-icon left>mdi-cart-plus</v-icon>
          Agregar al carrito
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '@/data/products.js'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

// Buscar el producto por id desde los datos simulados
const product = computed(() => {
  const id = Number(route.params.id)
  return products.find(p => p.id === id)
})

function addToCart(productId) {
  cartStore.addToCart(productId)
  
}

function goBack() {
  // Vuelve a la lista de productos y restaura el scroll al top
  router.push({ name: 'products' }).then(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>