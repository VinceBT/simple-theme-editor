import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import AccordionSection, { AccordionSectionProps } from './AccordionSection'

export default {
  title: 'Components/AccordionSection',
  component: AccordionSection,
} as Meta

const Template: Story<AccordionSectionProps> = (args) => <AccordionSection {...args} />

export const Default = Template.bind({})
Default.args = {
  sectionTitle: 'Section title',
  children: (
    <div style={{ height: '300px', background: '#eee' }}>
      This text should be hidden if the block is collapsed
    </div>
  ),
}
