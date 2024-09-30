import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(state,action) {
            return action.payload
        },
        removeNotification(){
            return ''
        }
    }
})

export const { createNotification,removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message,seconds) => {
    return async dispatch => {
        dispatch(createNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}