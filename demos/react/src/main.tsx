import { captureReactError, init } from '@tz-sentry/react'
import React from 'react'
import { createRoot } from 'react-dom/client'

init({ dsn: import.meta.env.VITE_TZ_SENTRY_DSN ?? '' })

class ErrorBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
    state = { failed: false }

    static getDerivedStateFromError() {
        return { failed: true }
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        captureReactError(error, info)
    }

    render() {
        return this.state.failed ? <p>Demo error captured.</p> : this.props.children
    }
}

function App() {
    return <button onClick={() => Promise.reject(new Error('React demo rejection'))}>Trigger monitored rejection</button>
}

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
)
