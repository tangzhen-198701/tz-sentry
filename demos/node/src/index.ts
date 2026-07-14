import { Monitoring } from '@tz-sentry/core'
import type { MonitoringEvent } from '@tz-sentry/types'

const monitoring = new Monitoring({ dsn: 'console://demo' })
monitoring.init({
    send(event: MonitoringEvent) {
        process.stdout.write(`${JSON.stringify(event)}\n`)
    },
})

monitoring.reportMessage('Node adapter smoke event')
monitoring.reportError(new Error('Node adapter smoke error'))
