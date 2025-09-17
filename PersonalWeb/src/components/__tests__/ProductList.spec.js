import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import ProductList from '../ProductList.vue'
import { createPinia, setActivePinia } from 'pinia'
import { products } from '@/data/products.js'

describe('ProductList.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renderiza todos los productos con v-for y key', () => {
    render(ProductList)
    products.forEach(product => {
      expect(screen.getByText(product.name)).toBeTruthy()
    })
  })

  it('filtra productos por búsqueda (inicio de palabra)', async () => {
    render(ProductList)
    const input = screen.getByLabelText(/buscar productos/i)
    await fireEvent.update(input, 'Lap')
    expect(screen.getByText(/Laptop Profesional XPS/i)).toBeTruthy()
    // No debe aparecer Router
    expect(screen.queryByText(/Router WiFi 6 Gigabit/i)).toBeNull()
  })

  it('muestra mensaje si no hay resultados', async () => {
    render(ProductList)
    const input = screen.getByLabelText(/buscar productos/i)
    await fireEvent.update(input, 'ZZZZ')
    expect(screen.getByText(/no se encontraron productos/i)).toBeTruthy()
  })

  it('muestra flag visual para productos sin stock', () => {
    render(ProductList)
    expect(screen.getByText(/sin stock/i)).toBeTruthy()
  })

  it('deshabilita el botón si el producto está sin stock', () => {
    render(ProductList)
    const sinStockBtn = screen.getAllByRole('button', { name: /agregar al carrito/i })
      .find(btn => btn.disabled)
    expect(sinStockBtn).toBeTruthy()
  })

  // Validación adicional sugerida:
  it('deshabilita el botón si el usuario ya agregó el máximo permitido', async () => {
    render(ProductList)
    const btn = screen.getAllByRole('button', { name: /agregar al carrito/i })[0]
    for (let i = 0; i < products[0].stock; i++) {
      await fireEvent.click(btn)
    }
    expect(btn).toBeDisabled()
  })
})