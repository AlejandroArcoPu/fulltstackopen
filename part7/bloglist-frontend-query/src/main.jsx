import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext.jsx'
import { ToggableContextProvider } from './components/ToggableContext.jsx'
import { UserContextProvider } from './components/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <ToggableContextProvider>
                    <UserContextProvider>
                        <NotificationContextProvider>
                            <App />
                        </NotificationContextProvider>
                    </UserContextProvider>
                </ToggableContextProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>
)
