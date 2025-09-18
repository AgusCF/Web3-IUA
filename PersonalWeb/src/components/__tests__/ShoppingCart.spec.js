import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import ShoppingCart from '../ShoppingCart.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '@/stores/cart'

describe('ShoppingCart.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('muestra mensaje si el carrito está vacío', () => {
    render(ShoppingCart)
    expect(screen.getByText(/carrito está vacío/i)).toBeTruthy()
  })

  it('agrega productos al carrito y muestra cantidad, precio y subtotal', async () => {
    render(ShoppingCart)
    const cartStore = useCartStore()
    cartStore.addToCart(1) // Simula agregar producto con id 1

    expect(screen.getByText(/Laptop Profesional XPS/i)).toBeTruthy()
    expect(screen.getByText(/\$1299\.99 c\/u/i)).toBeTruthy()
    expect(screen.getByText(/\$1299\.99/i)).toBeTruthy()
  })

  it('calcula el total general correctamente', async () => {
    render(ShoppingCart)
    const cartStore = useCartStore()
    cartStore.addToCart(1)
    cartStore.addToCart(2)
    expect(screen.getByText(/\$1799\.98/i)).toBeTruthy() // 1299.99 + 499.99
  })

  it('controla cantidad con + y - y elimina cuando llega a 0', async () => {
    render(ShoppingCart)
    const cartStore = useCartStore()
    cartStore.addToCart(1)
    expect(screen.getByText('1')).toBeTruthy()
    const minusBtn = screen.getByRole('button', { name: /mdi-minus/i })
    await fireEvent.click(minusBtn)
    expect(screen.queryByText(/Laptop Profesional XPS/i)).toBeNull()
  })

  // Validación adicional sugerida:
  it('vacía el carrito al hacer clic en "Vaciar carrito"', async () => {
    render(ShoppingCart)
    const cartStore = useCartStore()
    cartStore.addToCart(1)
    const clearBtn = screen.getByRole('button', { name: /vaciar carrito/i })
    await fireEvent.click(clearBtn)
    expect(screen.getByText(/carrito está vacío/i)).toBeTruthy()
  })
})
//npm run test:unit