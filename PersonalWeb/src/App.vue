<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Footer from './components/footer.vue'  // Añadir esta importación
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-row>
          <v-col>
            <v-btn variant="text" to="/">Inicio</v-btn>
            <v-btn variant="text" to="/register">Registro</v-btn>
            <v-btn variant="text" to="/about">Acerca de</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <Footer /> <!-- Añadir el componente Footer aquí -->
  </v-app>
</template>

<style scoped>
</style>

<!-- npm run dev -->