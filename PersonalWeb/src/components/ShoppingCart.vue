<template>
  <v-container>
    <h2 class="text-h4 font-weight-bold mb-4">Carrito de Compras</h2>
    <v-slide-y-transition>
      <template v-if="cartStore.items.length === 0">
        <v-alert
          type="info"
          variant="tonal"
          border="start"
          class="mb-4"
        >
          Tu carrito está vacío. Agrega algunos productos desde el catálogo.
        </v-alert>
      </template>
      <template v-else>
        <v-list>
          <v-list-item
            v-for="item in cartStore.items"
            :key="item.id"
            class="mb-2"
          >
            <v-card elevation="2" class="d-flex align-center pa-2">
              <v-img
                :src="item.image || 'https://via.placeholder.com/60x60?text=+'"
                width="60"
                height="60"
                class="mr-3"
                cover
              />
              <div class="flex-grow-1">
                <div class="text-body-1 font-weight-bold">{{ item.name }}</div>
                <div class="text-caption">Precio: ${{ item.price.toFixed(2) }} c/u</div>
                <div class="text-caption">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
              <v-btn-group>
                <v-btn
                  icon="mdi-minus"
                  density="comfortable"
                  @click="cartStore.decreaseQuantity(item.id)"
                  size="small"
                ></v-btn>
                <v-badge :content="item.quantity" color="primary" class="mx-2" />
                <v-btn
                  icon="mdi-plus"
                  density="comfortable"
                  @click="cartStore.increaseQuantity(item.id)"
                  size="small"
                ></v-btn>
              </v-btn-group>
              <v-btn
                icon="mdi-delete"
                color="error"
                variant="text"
                density="comfortable"
                class="ml-2"
                @click="cartStore.removeFromCart(item.id)"
              ></v-btn>
            </v-card>
          </v-list-item>
        </v-list>
      </template>
    </v-slide-y-transition>
    <v-card
      v-if="cartStore.items.length > 0"
      variant="outlined"
      class="mt-4"
      elevation="4"
    >
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="text-h5 font-weight-bold">Total:</div>
          <div class="text-h4 text-primary">${{ cartStore.total }}</div>
        </div>
        <div class="text-body-2 text-right">
          {{ cartStore.itemCount }} items en tu carrito
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          variant="text"
          prepend-icon="mdi-cart-remove"
          @click="cartStore.clearCart"
        >
          Vaciar carrito
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          prepend-icon="mdi-cart-check"
          size="large"
        >
          Finalizar compra
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

// Inicializar store del carrito
const cartStore = useCartStore()
</script>