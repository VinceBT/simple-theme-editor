import { render, screen } from '@testing-library/react'
import React from 'react'

import { simulateInputTextChange } from '../../utils/TestUtils'
import { EditableFieldProps } from '../EditableField/EditableField'
import EditableField from './EditableField'

const baseProps: EditableFieldProps = {
  name: 'Field name',
  submitLabel: 'OK',
}

test('renders field name', () => {
  render(<EditableField {...baseProps} />)
  expect(screen.getByText(/Field name/i)).toBeInTheDocument()
})

test('expands if clicked', () => {
  const container = render(<EditableField {...baseProps} />)
  const title = container.container.querySelector('.info-container') as HTMLDivElement
  title?.click()
  expect(screen.getByText(/OK/i)).toBeInTheDocument()
})

test('submit value if button is pressed', () => {
  let val = ''
  function handleSubmit(nextVal: string) {
    val = nextVal
  }
  const { container } = render(<EditableField {...baseProps} onSubmit={handleSubmit} />)
  // expand the component
  const title = container.querySelector('.info-container') as HTMLDivElement
  title?.click()
  // find the button and the input
  const button = screen.getByText(/OK/i) as HTMLButtonElement
  const input = container.querySelector('input') as HTMLInputElement
  simulateInputTextChange(input, 'Awesome')
  button.click()
  expect(val).toEqual(input.value)
})
