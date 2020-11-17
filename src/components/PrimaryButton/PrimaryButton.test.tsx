import { render, screen } from '@testing-library/react'
import React from 'react'

import PrimaryButton from './PrimaryButton'

test('renders button label', () => {
  render(<PrimaryButton text="Submit" />)
  const buttonElement = screen.queryByText(/Submit/i)
  expect(buttonElement).toBeInTheDocument()
})

test('calls callback if clicked', () => {
  let value = 0
  function callback() {
    value = 1
  }
  render(<PrimaryButton text="Submit" onClick={callback} />)
  const buttonElement = screen.queryByText(/Submit/i) as HTMLButtonElement
  buttonElement.click()
  expect(value).toEqual(1)
})

test('cannot call callback if disabled', () => {
  let value = 0
  function callback() {
    value = 1
  }
  render(<PrimaryButton text="Submit" onClick={callback} disabled />)
  const buttonElement = screen.queryByText(/Submit/i) as HTMLButtonElement
  buttonElement.click()
  expect(value).toEqual(0)
})
