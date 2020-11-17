import configureStore from '../configureStore'
import App from './App'

let store = configureStore().store

const testIdentifier = 'colors.primary'
const testIdentifier2 = 'colors.secondary'
const testIdentifier3 = 'unknown.value'
const testOriginalValue = '#000000'
const testOriginalValue2 = '#ffffff'
const testChangedValue = '#555555'

beforeEach(() => {
  store = configureStore().store
})

test('finds a rule by identifier', () => {
  const state = store.getState()
  expect(
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toEqual(testOriginalValue)
})

test('return null if rule not found', () => {
  const state = store.getState()
  expect(
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier3 })
  ).toBeNull()
})

test('changes rule value', () => {
  store.dispatch(
    App.actions.updateRuleValue({ identifier: testIdentifier, nextValue: testChangedValue })
  )
  const state = store.getState()
  expect(
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toEqual(testChangedValue)
})

test('gets a computed value if referencing another', () => {
  store.dispatch(
    App.actions.updateRuleValue({
      identifier: testIdentifier,
      nextValue: '{' + testIdentifier2 + '}',
    })
  )
  const state = store.getState()
  expect(
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toEqual(testOriginalValue2)
})

test('gives an error if referencing an unknown rule', () => {
  store.dispatch(
    App.actions.updateRuleValue({
      identifier: testIdentifier,
      nextValue: '{' + testIdentifier3 + '}',
    })
  )
  const state = store.getState()
  expect(() =>
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toThrow(/Unknown rule/i)
})

test('gives an error if a rule references itself', () => {
  store.dispatch(
    App.actions.updateRuleValue({
      identifier: testIdentifier,
      nextValue: '{' + testIdentifier + '}',
    })
  )
  const state = store.getState()
  expect(() =>
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toThrow(/Dependency cycle/i)
})

test('gives an error if a rule references a rule that reference itself', () => {
  store.dispatch(
    App.actions.updateRuleValue({
      identifier: testIdentifier,
      nextValue: '{' + testIdentifier2 + '}',
    })
  )
  store.dispatch(
    App.actions.updateRuleValue({
      identifier: testIdentifier2,
      nextValue: '{' + testIdentifier + '}',
    })
  )
  const state = store.getState()
  expect(() =>
    App.selectors.getThemeRuleValueByIdentifier(state, { identifier: testIdentifier })
  ).toThrow(/Dependency cycle/i)
})
