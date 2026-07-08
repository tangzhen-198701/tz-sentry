import React, { type JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface AuthRootProps {
    children: JSX.Element
}

const AuthRoot: React.FC<AuthRootProps> = ({ children }) => {
    if (!localStorage.getItem('token')) {
        return <Navigate to={`account/login?redirect=${window.location.pathname}`} />
    }
    return children
}

export default AuthRoot
