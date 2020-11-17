import App, { AppInitialState } from './App/App'

const rootReducer = {
  app: App.reducer,
}

export type GlobalState = {
  app: AppInitialState
}

export default rootReducer
