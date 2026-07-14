export function safely<T>(operation: () => T, fallback: T): T {
    try {
        return operation()
    } catch {
        return fallback
    }
}

export function truncate(value: string, maxLength: number): string {
    return value.length <= maxLength ? value : value.slice(0, Math.max(0, maxLength))
}
