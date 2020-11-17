import { action } from '@storybook/addon-actions'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton'

export default {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
} as Meta

const Template: Story<PrimaryButtonProps> = (args) => <PrimaryButton {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'OK',
  onClick: action('onClick'),
}
