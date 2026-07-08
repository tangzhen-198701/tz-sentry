import { Metrics } from '@tz-sentry/browser-utils'
import type { MonitoringOptions } from '@tz-sentry/core'
import { Monitoring } from '@tz-sentry/core'

import { Errors } from './integrations/errorsIntegration'
import { BrowserTransport } from './transport'

export function init(options: MonitoringOptions = { dsn: '' }) {
    const transport = new BrowserTransport(options.dsn)
    const monitoring = new Monitoring(options)

    monitoring.init(transport)
    new Errors(transport).init()
    new Metrics(transport).init()

    return monitoring
}
