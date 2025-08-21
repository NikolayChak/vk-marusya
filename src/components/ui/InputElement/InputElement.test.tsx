import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import InputElement from './InputElement'

describe('InputElement Component', () => {
  const mockInputProps = {
    name: 'email',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }

  test('renders InputElement component correctly', () => {
    render(
      <InputElement
        svgName="email"
        placeholder="Enter email"
        inputProp={mockInputProps}
      />
    )

    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email')
  })

  test('displays error message when provided', () => {
    render(
      <InputElement
        svgName="email"
        placeholder="Enter email"
        inputProp={mockInputProps}
        errorMessage="Invalid email"
      />
    )

    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveClass('inputs-login--error')
  })

  test('allows user input', async () => {
    render(
      <InputElement
        svgName="email"
        placeholder="Enter email"
        inputProp={mockInputProps}
      />
    )

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test@example.com')

    expect(mockInputProps.onChange).toHaveBeenCalled()
  })
})
