import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import configuration from '../configuration'
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

function configureStore() {
  const enhancer = composeWithDevTools()
  const combinedReducer = combineReducers(rootReducer)
  const persistedReducer = persistReducer(persistConfig, combinedReducer)
  const store = createStore(persistedReducer, enhancer)
  const persistor = persistStore(store)
  if (!configuration.persistence.enabled) {
    persistor.purge().catch((error) => {
      throw error
    })
  }

  return { store, persistor }
}

export default configureStore
