<template>
  <v-container>
    <h2 class="text-h4 mb-4">Carrito de Compras</h2>
    
    <!-- Mensaje de carrito vacío -->
    <v-alert
      v-if="cartStore.items.length === 0"
      type="info"
      variant="tonal"
      border="start"
      class="mb-4"
    >
      Tu carrito está vacío. Agrega algunos productos desde el catálogo.
    </v-alert>
    
    <!-- Listado de items del carrito -->
    <v-list v-else>
      <v-list-item
        v-for="item in cartStore.items"
        :key="item.id"
        :title="item.name"
        :subtitle="`$${item.price.toFixed(2)} c/u`"
      >
        <template v-slot:prepend>
          <v-avatar color="primary" size="36">
            <v-icon>mdi-package-variant-closed</v-icon>
          </v-avatar>
        </template>
        
        <template v-slot:append>
          <div class="d-flex align-center">
            <div class="text-right mr-4">
              <div class="text-body-1">${{ (item.price * item.quantity).toFixed(2) }}</div>
              <div class="text-caption">Subtotal</div>
            </div>
            
            <v-btn-group>
              <v-btn
                icon="mdi-minus"
                density="comfortable"
                @click="cartStore.decreaseQuantity(item.id)"
                size="small"
              ></v-btn>
              
              <v-btn
                variant="text"
                disabled
                min-width="40"
                size="small"
              >
                {{ item.quantity }}
              </v-btn>
              
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
          </div>
        </template>
      </v-list-item>
    </v-list>
    
    <!-- Totales y acciones -->
    <v-card
      v-if="cartStore.items.length > 0"
      variant="outlined"
      class="mt-4"
    >
      <v-card-text>
        <div class="d-flex justify-space-between align-center">
          <div class="text-h5">Total:</div>
          <div class="text-h4">${{ cartStore.total }}</div>
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