import { describe, it, expect } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/vue'
import QuickRegister from '../QuickRegister.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('QuickRegister.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('muestra mensaje de bienvenida solo si se registró un nombre válido', async () => {
    render(QuickRegister)
    const input = screen.getByLabelText(/nombre del cliente/i)
    const button = screen.getByRole('button', { name: /registrar cliente/i })

    // Ingresar nombre válido y enviar
    await fireEvent.update(input, 'Juan Perez')
    await fireEvent.click(button)

    expect(screen.getByText(/¡Bienvenido, Juan Perez!/i)).toBeTruthy()
  })

  it('muestra error y deshabilita el botón si el nombre tiene menos de 3 caracteres', async () => {
    render(QuickRegister)
    const input = screen.getByLabelText(/nombre del cliente/i)
    const button = screen.getByRole('button', { name: /registrar cliente/i })

    await fireEvent.update(input, 'Jo')
    expect(screen.getByText(/al menos 3 caracteres/i)).toBeTruthy()
    expect(button).toBeDisabled()
  })

  it('cambia el borde del input según validez', async () => {
    render(QuickRegister)
    const input = screen.getByLabelText(/nombre del cliente/i)

    await fireEvent.update(input, 'Jo')
    expect(input.className).toContain('border-error')

    await fireEvent.update(input, 'Jose')
    expect(input.className).not.toContain('border-error')
  })

  // Validación adicional sugerida:
  it('no muestra mensaje de bienvenida si el nombre es inválido', async () => {
    render(QuickRegister)
    const input = screen.getByLabelText(/nombre del cliente/i)
    const button = screen.getByRole('button', { name: /registrar cliente/i })

    await fireEvent.update(input, 'Jo')
    await fireEvent.click(button)
    expect(screen.queryByText(/¡Bienvenido/i)).toBeNull()
  })
})