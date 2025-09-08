import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products } from '@/data/products.js'

/**
 * Store para gestionar el estado del carrito de compras
 */
export const useCartStore = defineStore('cart', () => {
  // Estado
  const items = ref([])

  // Getters (propiedades computadas)
  /**
   * Calcula el total del carrito
   */
  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.price * item.quantity)
    }, 0).toFixed(2)
  })

  /**
   * Cuenta total de items en el carrito
   */
  const itemCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0)
  })

  // Actions
  /**
   * Agrega un producto al carrito
   * @param {Number} productId - ID del producto a agregar
   */
  function addToCart(productId) {
    // Buscar el producto en los datos
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      console.error(`Producto con ID ${productId} no encontrado`)
      return
    }
    
    // Verificar stock
    if (product.stock <= 0) {
      console.error(`Producto ${product.name} sin stock disponible`)
      return
    }
    
    // Buscar si el producto ya está en el carrito
    const existingItem = items.value.find(item => item.id === productId)
    
    if (existingItem) {
      // Verificar que no excedamos el stock disponible
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++
      } else {
        console.error(`No hay suficiente stock de ${product.name}`)
      }
    } else {
      // Añadir nuevo item al carrito
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      })
    }
  }

  /**
   * Incrementa la cantidad de un producto en el carrito
   * @param {Number} productId - ID del producto
   */
  function increaseQuantity(productId) {
    const item = items.value.find(item => item.id === productId)
    const product = products.find(p => p.id === productId)
    
    if (item && product && item.quantity < product.stock) {
      item.quantity++
    }
  }

  /**
   * Decrementa la cantidad de un producto en el carrito
   * @param {Number} productId - ID del producto
   */
  function decreaseQuantity(productId) {
    const itemIndex = items.value.findIndex(item => item.id === productId)
    
    if (itemIndex !== -1) {
      if (items.value[itemIndex].quantity > 1) {
        items.value[itemIndex].quantity--
      } else {
        // Eliminar el item si la cantidad llega a 0
        items.value.splice(itemIndex, 1)
      }
    }
  }

  /**
   * Elimina un producto del carrito
   * @param {Number} productId - ID del producto
   */
  function removeFromCart(productId) {
    const itemIndex = items.value.findIndex(item => item.id === productId)
    
    if (itemIndex !== -1) {
      items.value.splice(itemIndex, 1)
    }
  }

  /**
   * Vacía el carrito
   */
  function clearCart() {
    items.value = []
  }

  return {
    // Estado
    items,
    
    // Getters
    total,
    itemCount,
    
    // Actions
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
  }
})