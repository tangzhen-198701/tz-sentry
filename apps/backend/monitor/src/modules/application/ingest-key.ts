import { createHmac } from 'crypto'

import { requiredEnv } from '../../config/env'

export function createIngestKey(appId: string): string {
    return createHmac('sha256', requiredEnv('INGEST_SIGNING_SECRET')).update(appId).digest('base64url')
}
