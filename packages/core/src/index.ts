import { Transport } from './transport'
import type { MonitoringOptions } from './types'

export type { Transport } from './transport'
export type { IIntegration, MonitoringOptions } from './types'

export let getTransport: () => Transport | null = () => null

export class Monitoring {
    private transport: Transport | null = null //在对应环境中初始化

    constructor(private options: MonitoringOptions) {}

    init(transport: Transport) {
        this.transport = transport
        getTransport = () => transport

        this.options.integrations?.forEach(integration => integration.init(transport))
    }

    reportMessage(message: string) {
        this.transport?.send({
            event_type: 'message',
            message,
        })
    }

    reportError(error: Error) {
        this.transport?.send({
            event_type: 'error',
            type: error.name,
            stack: error.stack,
            message: error.message,
            path: window.location.pathname,
        })
    }

    reportEvent(event: unknown) {
        this.transport?.send({ type: 'event', event })
    }
}
