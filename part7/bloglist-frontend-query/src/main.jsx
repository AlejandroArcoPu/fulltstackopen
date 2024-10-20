import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { NotificationContextProvider } from './components/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <NotificationContextProvider>
            <App />
        </NotificationContextProvider>
    </StrictMode>
)
