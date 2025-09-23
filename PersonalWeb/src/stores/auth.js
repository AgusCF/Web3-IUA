import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Store de autenticación.
 * Simula autenticación y maneja persistencia en localStorage.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const loading = ref(false)
  const error = ref(null)

  /**
   * Simula login contra un backend.
   * @param {string} email
   * @param {string} password
   */
  async function login(email, password) {
    loading.value = true
    error.value = null
    // Simulación de delay y validación mock
    await new Promise(res => setTimeout(res, 700))
    if (
      (email === 'admin@web3.com' && password === '123456') ||
      (email === 'alumno@web3.com' && password === 'alumno123')
    ) {
      user.value = { email }
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    } else {
      error.value = 'Credenciales incorrectas'
      user.value = null
      localStorage.removeItem('user')
      return false
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  function restoreSession() {
    const saved = localStorage.getItem('user')
    if (saved) user.value = JSON.parse(saved)
  }

  return { user, loading, error, login, logout, restoreSession }
})