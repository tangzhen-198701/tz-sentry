import { Transport } from './transport'

export interface MonitoringOptions {
    dsn: string
    integrations?: IIntegration[]
}

export interface IIntegration {
    init(transport: Transport): void
}

export class Integration implements IIntegration {
    private transport: Transport | null = null
    constructor(private callback: () => void) {}
    init(transport: Transport) {
        this.transport = transport
    }
}
