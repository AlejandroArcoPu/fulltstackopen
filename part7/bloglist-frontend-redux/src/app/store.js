import { configureStore, combineReducers } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/notificationReducer'
import blogReducer from '../reducers/blogReducer'
import userReducer from '../reducers/userReducer'

const rootReducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
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
