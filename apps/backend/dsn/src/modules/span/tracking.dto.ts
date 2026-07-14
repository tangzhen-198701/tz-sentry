import { BadRequestException } from '@nestjs/common'

export interface TrackingEvent {
    event_type: string
    message?: string
    [key: string]: unknown
}

const MAX_BATCH_SIZE = 100
const MAX_EVENT_TYPE_LENGTH = 64
const MAX_MESSAGE_LENGTH = 8_192

export function parseTrackingBatch(value: unknown): TrackingEvent[] {
    if (!Array.isArray(value) || value.length === 0 || value.length > MAX_BATCH_SIZE) {
        throw new BadRequestException(`请求体必须是包含 1-${MAX_BATCH_SIZE} 个事件的数组`)
    }

    return value.map((event, index) => {
        if (!event || typeof event !== 'object' || Array.isArray(event)) {
            throw new BadRequestException(`第 ${index + 1} 个事件必须是对象`)
        }

        const candidate = event as Record<string, unknown>
        if (
            typeof candidate.event_type !== 'string' ||
            candidate.event_type.length < 1 ||
            candidate.event_type.length > MAX_EVENT_TYPE_LENGTH ||
            !/^[a-z][a-z0-9_.-]*$/i.test(candidate.event_type)
        ) {
            throw new BadRequestException(`第 ${index + 1} 个事件的 event_type 无效`)
        }
        if (candidate.message !== undefined && (typeof candidate.message !== 'string' || candidate.message.length > MAX_MESSAGE_LENGTH)) {
            throw new BadRequestException(`第 ${index + 1} 个事件的 message 无效`)
        }

        return candidate as TrackingEvent
    })
}
