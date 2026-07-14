export type EventType = 'error' | 'event' | 'message' | 'performance' | (string & {})

export interface MonitoringEvent {
    event_type: EventType
    message?: string
    path?: string
    [key: string]: unknown
}

export interface ErrorMonitoringEvent extends MonitoringEvent {
    event_type: 'error'
    type?: string
    stack?: string
}

export interface PerformanceMonitoringEvent extends MonitoringEvent {
    event_type: 'performance'
    name: string
    value: number
    unit: 'milliseconds' | 'score'
}

export type TrackingBatch = MonitoringEvent[]
