import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialState,
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification() {
            return {}
        },
    },
})

export const { createNotification, removeNotification } =
    notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message) => {
    return (dispatch) => {
        dispatch(createNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}
