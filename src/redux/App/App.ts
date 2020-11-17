import { setIn, updateIn } from 'immutable'
import { createAction, createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import replaceAll from 'string.prototype.replaceall'

import ThemeSection from '../../models/ThemeSection'
import { GlobalState } from '../reducers'
import { themeSectionsMock } from './mocks'

export type AppInitialState = {
  autoSubmit: boolean
  themeSections: ThemeSection[]
}

// -------------
// Initial state
// -------------
const initialState: AppInitialState = {
  autoSubmit: true,
  themeSections: themeSectionsMock,
}

// -------------
// Actions
// -------------
const actions = {
  setAutoSubmit: createAction<{ autoSubmit: boolean }>('setAutoSubmit'),
  updateRuleValue: createAction<{ identifier: string; nextValue: string }>('updateRuleValue'),
}

// -------------
// Reducer
// -------------
const reducer = createReducer(function (on) {
  on(actions.setAutoSubmit, (state, { autoSubmit }) => setIn(state, ['autoSubmit'], autoSubmit))
  on(actions.updateRuleValue, (state, { identifier, nextValue }) =>
    updateIn(state, ['themeSections'], (themeSections: ThemeSection[]) => {
      return themeSections.map((themeSection) => ({
        ...themeSection,
        rules: themeSection.rules.map((rule) => ({
          ...rule,
          value: rule.identifier === identifier ? nextValue : rule.value,
        })),
      }))
    })
  )
}, initialState)

// -------------
// Selectors
// -------------
const getState = (state: GlobalState) => state
const getProps = (state: GlobalState, props: any) => props
const getRoot = (state: GlobalState) => state.app
const getAutoSubmit = (state: GlobalState) => getRoot(state).autoSubmit
const getThemeSections = (state: GlobalState) => getRoot(state).themeSections

const getThemeRuleValueByIdentifier = createSelector(
  [getState, getProps],
  (state, props: { parentIdentifiers: string[]; identifier: string }) => {
    const { parentIdentifiers = [], identifier } = props
    const themeSections = getThemeSections(state)
    for (const themeSection of themeSections) {
      for (const themeRule of themeSection.rules) {
        if (themeRule.identifier === identifier) {
          return replaceAll(
            themeRule.value,
            /{([a-zA-Z0-9_.-]+)}/g,
            (substring: string, firstGroup: string): string => {
              if (parentIdentifiers.includes(firstGroup)) {
                throw new Error(
                  'Dependency cycle: ' +
                    parentIdentifiers.concat(identifier).concat(firstGroup).join(' -> ')
                )
              }
              const value = getThemeRuleValueByIdentifier(state, {
                parentIdentifiers: parentIdentifiers.concat(identifier),
                identifier: firstGroup,
              })
              if (value === null) throw new Error('Unknown rule: ' + firstGroup)
              return value
            }
          )
        }
      }
    }
    return null
  }
)
const getComputedThemeSections = createSelector([getState], (state) => {
  const themeSections = getThemeSections(state)
  return themeSections.map((themeSection) => ({
    ...themeSection,
    rules: themeSection.rules.map((rule) => {
      let computedValue, computationError
      try {
        computedValue = getThemeRuleValueByIdentifier(state, {
          identifier: rule.identifier,
        })
      } catch (e) {
        computedValue = null
        computationError = e.message
      }
      return {
        ...rule,
        computedValue,
        computationError,
      }
    }),
  }))
})

const selectors = {
  getAutoSubmit,
  getThemeRuleValueByIdentifier,
  getComputedThemeSections,
}

const App = { actions, reducer, selectors }

export default App
