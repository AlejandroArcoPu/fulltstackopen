import counterReducer from '../reducers/counterReducer'
import { createStore } from 'redux'

export const store = createStore(counterReducer)
