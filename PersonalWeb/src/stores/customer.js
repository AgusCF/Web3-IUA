// Good practice: Service layer pattern example
// filepath: src/services/customerService.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Pinia store for managing customer data
 * This will eventually connect to a backend API
 */
export const useCustomerStore = defineStore('customer', () => {
  // State
  const customers = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  /**
   * Register a new customer
   * @param {Object} customerData - Customer information
   * @param {string} customerData.name - Customer's name
   * @returns {Promise<Object>} The newly created customer
   */
  async function registerCustomer(customerData) {
    // Reset any previous errors
    error.value = null
    
    // Validation logic
    if (!customerData.name || customerData.name.trim().length < 3) {
      error.value = 'El nombre debe tener al menos 3 caracteres'
      return null
    }
    
    try {
      isLoading.value = true
      
      // Simulate API delay - will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Create customer object with unique ID
      const newCustomer = {
        id: Date.now(), // Temporary ID generation
        name: customerData.name.trim(),
        registeredAt: new Date()
      }
      
      // Add to local store (will be replaced with API call)
      customers.value.push(newCustomer)
      
      return newCustomer
    } catch (err) {
      error.value = 'Error al registrar el cliente'
      console.error('Error registering customer:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }
  
  /**
   * Get all customers
   * @returns {Array} List of all customers
   */
  function getAllCustomers() {
    return customers.value
  }
  
  return {
    // State
    customers,
    isLoading,
    error,
    
    // Actions
    registerCustomer,
    getAllCustomers
  }
})