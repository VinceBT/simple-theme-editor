import { render, screen } from '@testing-library/react'
import React from 'react'

import AccordionSection, { AccordionSectionProps } from './AccordionSection'

const baseProps: AccordionSectionProps = {
  sectionTitle: 'Section title',
}

test('renders section title', () => {
  render(<AccordionSection {...baseProps} />)
  expect(screen.queryByText(/Section title/i)).toBeInTheDocument()
})

test('renders children if open', () => {
  render(
    <AccordionSection {...baseProps} expanded>
      child
    </AccordionSection>
  )
  expect(screen.queryByText(/child/i)).toBeInTheDocument()
})

test('renders nothing if closed', () => {
  render(
    <AccordionSection {...baseProps} expanded={false}>
      child
    </AccordionSection>
  )
  expect(screen.queryByText(/child/i)).toBeNull()
})
