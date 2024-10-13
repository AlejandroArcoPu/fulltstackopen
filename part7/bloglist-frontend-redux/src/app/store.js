import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'

const rootReducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
})

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
}

const store = configureStore({
    reducer: rootReducer,
})

export default store
