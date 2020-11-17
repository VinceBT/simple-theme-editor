export enum RuleType {
  Text,
  Em,
  Px,
  Color,
}

export default interface ThemeRule {
  identifier: string
  name: string
  value: string
  computedValue?: string
  computationError?: string
  type: RuleType
}
