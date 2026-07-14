import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { integerEnv } from '../../config/env'

interface WindowCounter {
    count: number
    resetAt: number
}

@Injectable()
export class IngestRateLimiter {
    private readonly limit = integerEnv('INGEST_RATE_LIMIT_PER_MINUTE', 600)
    private readonly counters = new Map<string, WindowCounter>()

    assertAllowed(key: string): void {
        const now = Date.now()
        const current = this.counters.get(key)
        if (!current || current.resetAt <= now) {
            this.counters.set(key, { count: 1, resetAt: now + 60_000 })
            if (this.counters.size > 10_000) this.removeExpired(now)
            return
        }

        current.count += 1
        if (current.count > this.limit) {
            throw new HttpException('采集请求过于频繁', HttpStatus.TOO_MANY_REQUESTS)
        }
    }

    private removeExpired(now: number) {
        for (const [key, counter] of this.counters) {
            if (counter.resetAt <= now) this.counters.delete(key)
        }
    }
}
