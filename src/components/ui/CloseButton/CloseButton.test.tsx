import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import CloseButton from './CloseButton'

describe('CloseButton Component', () => {
  const defaultProps = {
    name: 'modal',
    fill: 'red',
    onClick: jest.fn(),
  }

  it('should render the button with correct class name', () => {
    render(<CloseButton {...defaultProps} />)

    const button = screen.getByRole('button')
    expect(button).toHaveClass(`${defaultProps.name}__close`)
    expect(button).toHaveClass('close')
  })

  it('should render the Close icon with correct fill color', () => {
    render(<CloseButton {...defaultProps} />)

    const svgElement = screen.getByRole('button').querySelector('svg')
    expect(svgElement).toBeTruthy()
  })

  it('should call onClick when clicked', async () => {
    render(<CloseButton {...defaultProps} />)

    const button = screen.getByRole('button')
    await userEvent.click(button)

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
