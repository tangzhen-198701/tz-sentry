import { getBrowserInfo } from '@tz-sentry/browser-utils'
import type { Transport } from '@tz-sentry/core'

export class BrowserTransport implements Transport {
    constructor(private readonly dsn: string) {}

    private batchSize = 2
    private batch: Record<string, unknown>[] = []
    private batchInterval: number = 2000
    private batchTimeStamp: number = Date.now()

    send(data: Record<string, unknown>) {
        if (!this.dsn) return

        const browserInfo = getBrowserInfo()
        const playLoad = {
            ...data,
            ...browserInfo,
        }

        this.batch.push(playLoad)
        if (this.batch.length >= this.batchSize) {
            this.flush()
            this.batchTimeStamp = Date.now()
            return
        }

        if (Date.now() - this.batchTimeStamp < this.batchInterval) {
            return
        }
        this.batchTimeStamp = Date.now()
        this.flush()
    }

    private flush() {
        const batchItems = this.batch.slice(0, this.batchSize)
        this.batch = this.batch.slice(this.batchSize)

        void fetch(this.dsn, {
            method: 'POST',
            body: JSON.stringify(batchItems),
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(err => {
            console.log('Reporting failures must not break the host application.', err)
            // Reporting failures must not break the host application.
        })
    }
}
