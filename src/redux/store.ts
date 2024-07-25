import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from './rootstore'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage,
}

const pReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(pReducer, compose(applyMiddleware(thunk)))

export const persistor = persistStore(store)
