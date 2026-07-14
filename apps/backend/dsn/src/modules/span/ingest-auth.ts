import { createHmac, timingSafeEqual } from 'crypto'

import { requiredEnv } from '../../config/env'

export function isValidIngestKey(appId: string, candidate: string): boolean {
    const expected = createHmac('sha256', requiredEnv('INGEST_SIGNING_SECRET')).update(appId).digest('base64url')
    const expectedBuffer = Buffer.from(expected)
    const candidateBuffer = Buffer.from(candidate)
    return expectedBuffer.length === candidateBuffer.length && timingSafeEqual(expectedBuffer, candidateBuffer)
}
