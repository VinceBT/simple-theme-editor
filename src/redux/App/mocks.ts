import { RuleType } from '../../models/ThemeRule'

export const themeSectionsMock = [
  {
    name: 'General colors',
    rules: [
      {
        identifier: 'colors.primary',
        name: 'Primary font color',
        value: '#000000',
        type: RuleType.Color,
      },
      {
        identifier: 'colors.primaryBackground',
        name: 'Primary background color',
        value: '#ffffff',
        type: RuleType.Color,
      },
      {
        identifier: 'colors.secondary',
        name: 'Secondary font color',
        value: '#ffffff',
        type: RuleType.Color,
      },
      {
        identifier: 'colors.secondaryBackground',
        name: 'Secondary background color',
        value: '#4a86e8',
        type: RuleType.Color,
      },
      {
        identifier: 'colors.highlight1',
        name: 'Highlight on primary background',
        value: '#4a86e8',
        type: RuleType.Color,
      },
      {
        identifier: 'colors.highlight2',
        name: 'Highlight on secondary background',
        value: '#ffab40',
        type: RuleType.Color,
      },
    ],
  },
  {
    name: 'Global sizes',
    rules: [
      {
        identifier: 'sizes.text',
        name: 'Default text size (em)',
        value: '1.1',
        type: RuleType.Em,
      },
      {
        identifier: 'sizes.h1',
        name: 'Header1 text size (em)',
        value: '1.4',
        type: RuleType.Em,
      },
      {
        identifier: 'sizes.h2',
        name: 'Header2 text size (em)',
        value: '1.2',
        type: RuleType.Em,
      },
      {
        identifier: 'sizes.borderWidth',
        name: 'Default border width (px)',
        value: '1',
        type: RuleType.Px,
      },
    ],
  },
  {
    name: 'Text field',
    rules: [
      {
        identifier: 'textfield.textSize',
        name: 'Text size (em)',
        value: '1.1',
        type: RuleType.Em,
      },
      {
        identifier: 'textfield.color',
        name: 'Font color',
        value: '{colors.primary}',
        type: RuleType.Color,
      },
      {
        identifier: 'textfield.border',
        name: 'Border',
        value: '{sizes.borderWidth}px solid {colors.primaryBackground}',
        type: RuleType.Text,
      },
      {
        identifier: 'textfield.background',
        name: 'Background',
        value: '{colors.primaryBackground}',
        type: RuleType.Color,
      },
    ],
  },
  {
    name: 'Buttons',
    rules: [
      {
        identifier: 'buttons.fontSize',
        name: 'Font size (em)',
        value: 'calc(1.1*1.2)',
        type: RuleType.Text,
      },
      {
        identifier: 'buttons.color',
        name: 'Font color',
        value: '{colors.primary}',
        type: RuleType.Color,
      },
      {
        identifier: 'buttons.background',
        name: 'Background',
        value: '{colors.highlight1}',
        type: RuleType.Color,
      },
    ],
  },
  {
    name: 'Errors (examples of erroneous values)',
    rules: [
      {
        identifier: 'errors.unknown',
        name: 'Value referencing an unknown value',
        value: '{errors.whoareyou}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.self',
        name: 'Value referencing itself',
        value: '{errors.self}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.errDuo1',
        name: 'Value refencing the following one',
        value: '{errors.errDuo2}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.errDuo2',
        name: 'Value referencing the previous one',
        value: '{errors.errDuo1}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.errTrio1',
        name: 'Dependency triangle value 1',
        value: '{errors.errTrio2}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.errTrio2',
        name: 'Dependency triangle value 2',
        value: '{errors.errTrio3}',
        type: RuleType.Text,
      },
      {
        identifier: 'errors.errTrio3',
        name: 'Dependency triangle value 3',
        value: '{errors.errTrio1}',
        type: RuleType.Text,
      },
    ],
  },
]
