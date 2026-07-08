import { createBrowserRouter, Outlet } from 'react-router-dom'

import Dashboard from '@/views/Dashboard'
import Login from '@/views/Login'

import AuthRoot from './AuthRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoot>
                <Outlet />
            </AuthRoot>
        ),
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
        ],
    },
    {
        path: '/account/login',
        element: <Login />,
    },
    {
        path: '/404',
        element: <div>404 NOT FOUND</div>,
    },
])
