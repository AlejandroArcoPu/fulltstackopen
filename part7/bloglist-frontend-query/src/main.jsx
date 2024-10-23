import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext.jsx'
import { ToggableContextProvider } from './components/ToggableContext.jsx'
import { UserContextProvider } from './components/UserContext.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Users from './routes/users.jsx'
import User from './routes/user.jsx'

const queryClient = new QueryClient()

const AppProviders = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ToggableContextProvider>
                <UserContextProvider>
                    <NotificationContextProvider>
                        {children}
                    </NotificationContextProvider>
                </UserContextProvider>
            </ToggableContextProvider>
        </QueryClientProvider>
    )
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AppProviders>
                <App />
            </AppProviders>
        ),
        children: [
            {
                path: 'users',
                element: (
                    <QueryClientProvider client={queryClient}>
                        <Users />
                    </QueryClientProvider>
                ),
            },
            {
                path: 'users/:userId',
                element: (
                    <QueryClientProvider client={queryClient}>
                        <User />
                    </QueryClientProvider>
                ),
            },
        ],
    },
    // {
    //     path: '/users',
    //     element: (
    //         <QueryClientProvider client={queryClient}>
    //             <Users />
    //         </QueryClientProvider>
    //     ),
    // },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
