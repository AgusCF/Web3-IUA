<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
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
          <v-col class="d-flex justify-end align-center" v-if="auth.user">
            <span class="mr-4">{{ auth.user.email }}</span>
            <v-btn color="error" variant="tonal" @click="auth.logout()">Salir</v-btn>
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

<!-- npm run dev -->