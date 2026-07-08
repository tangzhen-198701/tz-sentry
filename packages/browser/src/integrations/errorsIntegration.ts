import type { Transport } from '@tz-sentry/core'

export interface OnUnhandledRejectionErrorPayload {
    type: string
    stack: string
    message: string
    path: string
}

/**
 * 错误处理
 */
export class Errors {
    constructor(private transport: Transport) {}
    init() {
        window.onerror = (message, _source, _lineno, _colno, error) => {
            this.transport.send({
                event_type: 'error',
                type: error?.name,
                stack: error?.stack,
                message,
                path: window.location.pathname,
            })
        }

        window.onunhandledrejection = event => {
            const reason = event.reason instanceof Error ? event.reason : new Error(String(event.reason))

            this.transport.send({
                event_type: 'error',
                type: 'unhandledrejection',
                stack: reason.stack,
                message: reason.message,
                path: window.location.pathname,
            })
        }
    }
}
