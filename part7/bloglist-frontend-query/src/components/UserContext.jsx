import { createContext, useReducer, useContext } from 'react'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'logout':
            return null
        case 'login':
            return action.user
    }
    throw Error('Unknown action: ' + action.type)
}

export const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, userDispatch] = useReducer(userReducer, null)

    return (
        <UserContext.Provider value={[user, userDispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserValue = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[0]
}

export const useUserDispatch = () => {
    const userAndDispatch = useContext(UserContext)
    return userAndDispatch[1]
}
