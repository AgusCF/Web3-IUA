<template>
  <v-container>
    <h2 class="text-h4 font-weight-bold mb-4">Catálogo de Productos</h2>
    <v-text-field
      v-model="searchQuery"
      label="Buscar productos"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      clearable
      class="mb-4"
    ></v-text-field>
    <v-alert
      v-if="filteredProducts.length === 0"
      type="info"
      variant="tonal"
      border="start"
      class="mb-4"
    >
      No se encontraron productos que coincidan con tu búsqueda.
    </v-alert>
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
          class="d-flex flex-column product-card"
          elevation="4"
        >
          <!--Las imagenes no estan implementadas-->
          <v-img
            :src="product.image || 'https://via.placeholder.com/300x200?text=Producto'"
            height="160"
            cover
            class="mb-2"
          />
          <v-card-title>
            <v-tooltip bottom>
              <template #activator="{ props }">
                <span v-bind="props" class="truncate">{{ product.name }}</span>
              </template>
              {{ product.name }}
            </v-tooltip>
          </v-card-title>
          <v-card-text class="flex-grow-1">
            <div class="text-h5 font-weight-bold mb-2">${{ product.price.toFixed(2) }}</div>
            <v-chip
              :color="product.stock > 0 ? 'success' : 'error'"
              size="small"
              class="mb-2"
              label
            >
              {{ product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock' }}
            </v-chip>
          </v-card-text>

          <v-btn
            variant="text"
            color="secondary"
            @click="goToDetail(product.id)"
          >
            Ver detalle
          </v-btn>

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
import { useRouter } from 'vue-router'
const router = useRouter()

function goToDetail(id) {
  router.push({ name: 'producto-detalle', params: { id } })
}
</script>

<style scoped>
.product-card {
  transition: box-shadow 0.2s;
}
.product-card:hover {
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}
.truncate {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.out-of-stock {
  opacity: 0.7;
}
</style>
