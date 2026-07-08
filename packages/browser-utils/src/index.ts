import { Metrics } from './integrations/metrics'

export function getBrowserInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        referrer: document.referrer,
        path: location.pathname,
    }
}
export { Metrics }
