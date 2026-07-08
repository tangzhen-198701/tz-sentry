import { useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/login-form'

export default function Login() {
    const navigate = useNavigate()

    const handleSubmit = async (formData: FormData) => {
        const username = formData.get('username') as string
        const password = formData.get('password') as string
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
        const response = await res.json()
        if (response.success && response.data?.access_token) {
            localStorage.setItem('token', response.data.access_token)
            navigate('/dashboard')
        }
    }
    return (
        <div>
            <LoginForm onLogin={handleSubmit} />
        </div>
    )
}
