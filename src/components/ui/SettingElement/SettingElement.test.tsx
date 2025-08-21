import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SettingElement from './SettingElement'

describe('SettingElement Component', () => {
  const defaultProps = {
    name: 'User Name',
    element: <span>Icon</span>,
    className: 'custom-class',
    title: 'Profile Setting',
  }

  it('should render the component with provided props', () => {
    render(<SettingElement {...defaultProps} />)

    expect(screen.getByText(defaultProps.name)).toBeInTheDocument()
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument()
    expect(screen.getByText('Icon')).toBeInTheDocument()

    const wrappedElement = screen
      .getByText('Icon')
      .closest(`.${defaultProps.className}`)
    expect(wrappedElement).not.toBeNull()
  })

  it('should render correctly when element is a string', () => {
    render(<SettingElement {...defaultProps} element="Text Element" />)

    expect(screen.getByText('Text Element')).toBeInTheDocument()

    const wrappedElement = screen
      .getByText('Text Element')
      .closest(`.${defaultProps.className}`)
    expect(wrappedElement).not.toBeNull()
  })
})
