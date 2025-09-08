<template>
  <div class="products">
    <v-container>
      <v-row>
        <!-- Lista de productos (2/3 del ancho) -->
        <v-col cols="12" md="8">
          <ProductList />
        </v-col>
        
        <!-- Carrito (1/3 del ancho) -->
        <v-col cols="12" md="4">
          <ShoppingCart />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProductList from '@/components/ProductList.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'
</script>