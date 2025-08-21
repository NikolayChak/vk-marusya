import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Error from './Error'

describe('Error Component', () => {
  it('should render the error message correctly', () => {
    const errorMessage = 'Network failure'
    render(<Error message={errorMessage} />)
    expect(
      screen.getByText(`Произошла ошибка ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('should have correct class names applied', () => {
    render(<Error message="Test error" />)

    const errorContainer = screen.getByText(/Произошла ошибка/i).parentElement
    expect(errorContainer).toHaveClass('container')
    expect(errorContainer).toHaveClass('wrap-error')
  })
})
