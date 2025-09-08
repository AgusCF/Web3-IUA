<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-row>
          <v-col>
            <v-btn variant="text" to="/">Registro</v-btn>
            <v-btn variant="text" to="/products">Productos</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <Footer /> <!-- mi footer -->
  </v-app>
</template>

<style scoped>
</style>

<!-- npm run dev -->