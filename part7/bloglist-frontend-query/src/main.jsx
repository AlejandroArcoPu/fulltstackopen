import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext.jsx'
import { ToggableContextProvider } from './components/ToggableContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToggableContextProvider>
                <NotificationContextProvider>
                    <App />
                </NotificationContextProvider>
            </ToggableContextProvider>
        </QueryClientProvider>
    </StrictMode>
)
