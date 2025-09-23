<!-- filepath: src/views/LoginView.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8"
      max-width="400"
      elevation="8"
      rounded="xl"
    >
      <v-card-title class="text-h5 mb-4 text-center">Iniciar Sesión</v-card-title>
      <v-form @submit.prevent="onLogin" ref="formRef">
        <v-text-field
          v-model="email"
          label="Email"
          type="email"
          :rules="emailRules"
          required
          prepend-inner-icon="mdi-email"
          autocomplete="username"
          aria-label="Email"
        />
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          :rules="passwordRules"
          required
          prepend-inner-icon="mdi-lock"
          autocomplete="current-password"
          aria-label="Contraseña"
        />
        <v-alert
          v-if="auth.error"
          type="error"
          class="my-2"
          variant="tonal"
        >
          {{ auth.error }}
        </v-alert>
        <v-btn
          :loading="auth.loading"
          :disabled="!isValid"
          color="primary"
          block
          size="large"
          class="mt-4"
          type="submit"
        >
          Ingresar
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const formRef = ref(null)

const emailRules = [
  v => !!v || 'El email es requerido',
  v => /.+@.+\..+/.test(v) || 'Formato de email inválido'
]
const passwordRules = [
  v => !!v || 'La contraseña es requerida',
  v => v.length >= 6 || 'Mínimo 6 caracteres'
]

const isValid = computed(() =>
  /.+@.+\..+/.test(email.value) && password.value.length >= 6
)

async function onLogin() {
  if (!isValid.value) return
  const ok = await auth.login(email.value, password.value)
  if (ok) {
    router.push({ path: '/' })
  }
}

// Si ya hay sesión, redirigir a /
if (auth.user) {
  router.replace({ path: '/' })
}
</script>