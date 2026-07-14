import { init as initBrowser } from '@tz-sentry/browser'
import type { Monitoring, MonitoringOptions } from '@tz-sentry/core'

let client: Monitoring | undefined

export function init(options: MonitoringOptions): Monitoring {
    client = initBrowser(options)
    return client
}

/** Pass this to a React Error Boundary's componentDidCatch callback. */
export function captureReactError(error: Error, info?: { componentStack?: string | null }): void {
    client?.reportError(error)
    if (info?.componentStack) client?.reportEvent({ source: 'react-error-boundary', componentStack: info.componentStack })
}
