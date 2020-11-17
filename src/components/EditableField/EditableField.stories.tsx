import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { RuleType } from '../../models/ThemeRule'
import EditableField, { EditableFieldProps } from './EditableField'

export default {
  title: 'Components/EditableField',
  component: EditableField,
} as Meta

const Template: Story<EditableFieldProps> = (args) => <EditableField {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Editable input',
  computedValue: 'Editable input',
  actualValue: 'Editable input',
  identifier: 'textfield.border',
  type: RuleType.Px,
  valueLabel: 'Value',
  valuePlaceholder: 'Example: 1px solid black',
  typeLabel: 'Type',
  typeLabels: {
    [RuleType.Text]: 'Text',
    [RuleType.Em]: 'Em',
    [RuleType.Px]: 'Px',
    [RuleType.Color]: 'Color',
  },
  submitLabel: 'OK',
  autoSubmit: false,
  onSubmit: () => {},
}
