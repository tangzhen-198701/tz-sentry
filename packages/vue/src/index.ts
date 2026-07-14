import { init as initBrowser } from '@tz-sentry/browser'
import type { Monitoring, MonitoringOptions } from '@tz-sentry/core'

export interface VueAppLike {
    config: { errorHandler?: (error: unknown, instance: unknown, info: string) => void }
}

export function init(options: MonitoringOptions, app?: VueAppLike): Monitoring {
    const client = initBrowser(options)
    if (app) {
        const previousHandler = app.config.errorHandler
        app.config.errorHandler = (error, instance, info) => {
            client.reportError(error instanceof Error ? error : new Error(String(error)))
            client.reportEvent({ source: 'vue-error-handler', info })
            previousHandler?.(error, instance, info)
        }
    }
    return client
}
