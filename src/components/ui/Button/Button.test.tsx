import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

jest.mock('@/shared', () => ({
  Loader: jest.fn(() => <div data-testid="mock-loader">Mock Loader</div>),
}))

describe('Button Component', () => {
  it('renders with text', () => {
    render(<Button name="Click me" />)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders SVG button', () => {
    render(<Button isSVG={<svg data-testid="svg-icon" />} />)
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument()
  })

  it('applies active class when isActive is true', () => {
    render(<Button name="Active Button" isActive />)
    const button = screen.getByText('Active Button')
    expect(button).toHaveClass('btn__active')
  })

  it('renders mocked Loader when isLoading is true', () => {
    render(<Button isLoading />)
    expect(screen.getByTestId('mock-loader')).toBeInTheDocument()
  })

  it('uses correct button type', () => {
    render(<Button name="Submit" type="submit" />)
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit')
  })
})
