import { useContext, createContext, useRef } from 'react'

export const ToggableContext = createContext()

export const ToggableContextProvider = (props) => {
    const current = useRef()
    return (
        <ToggableContext.Provider value={current}>
            {props.children}
        </ToggableContext.Provider>
    )
}

export const useRefShare = () => {
    return useContext(ToggableContext)
}
