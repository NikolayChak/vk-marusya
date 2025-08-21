import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Loader from './Loader'

describe('Loader Component', () => {
  it('should render the full-sized loader by default', () => {
    render(<Loader />)

    const wrapper = screen.getByTestId('loader-wrapper')
    const loader = screen.getByTestId('loader')

    expect(wrapper).toHaveClass('loader-wrapper--full')
    expect(loader).toHaveClass('loader')
  })

  it('should render the mini loader when isMini is true', () => {
    render(<Loader isMini />)

    const wrapper = screen.getByTestId('loader-wrapper')
    const loader = screen.getByTestId('loader')

    expect(wrapper).not.toHaveClass('loader-wrapper--full')
    expect(loader).toHaveClass('loader loader--mini')
  })
})
