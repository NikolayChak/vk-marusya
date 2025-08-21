import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import {useMediaQuery} from 'react-responsive'
import DetailsElement, {DetailsElementProps} from './DetailsElement'

jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}))

describe('DetailsElement Component', () => {
  const props: DetailsElementProps = {
    title: 'Test Title',
    description: 'Test Description',
  }

  it('renders dash when not in mobile view', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false)

    render(<DetailsElement {...props} />)

    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.description)).toBeInTheDocument()
    expect(document.querySelector('.dash')).toBeInTheDocument()
  })
})
