import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {BrowserRouter} from 'react-router-dom'
import LinkElement from './LinkElement'

describe('LinkElement Component', () => {
  const mockProps = {
    title: 'Home',
    to: '/home',
    isActive: true,
    svg: <svg data-testid="icon" />,
  }

  test('renders LinkElement component correctly', () => {
    render(
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
          v7_startTransition: true,
        }}
      >
        <LinkElement {...mockProps} />
      </BrowserRouter>
    )

    expect(screen.getByText(mockProps.title)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', mockProps.to)
  })

  test('applies active styling when isActive is true', () => {
    render(
      <BrowserRouter>
        <LinkElement {...mockProps} />
      </BrowserRouter>
    )

    expect(screen.getByRole('link')).toHaveClass('item--active')
  })

  test('renders svg icon if provided', () => {
    render(
      <BrowserRouter>
        <LinkElement {...mockProps} />
      </BrowserRouter>
    )

    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
