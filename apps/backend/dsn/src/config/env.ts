export function requiredEnv(name: string): string {
    const value = process.env[name]?.trim()

    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`)
    }

    return value
}

export function integerEnv(name: string, fallback: number): number {
    const raw = process.env[name]?.trim()
    if (!raw) return fallback

    const value = Number(raw)
    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`Environment variable ${name} must be a positive integer`)
    }

    return value
}

export function booleanEnv(name: string, fallback: boolean): boolean {
    const raw = process.env[name]?.trim().toLowerCase()
    if (!raw) return fallback
    if (raw === 'true') return true
    if (raw === 'false') return false
    throw new Error(`Environment variable ${name} must be true or false`)
}

export function identifierEnv(name: string): string {
    const value = requiredEnv(name)
    if (!/^[A-Za-z_][A-Za-z0-9_.]*$/.test(value)) {
        throw new Error(`Environment variable ${name} must be a database identifier`)
    }
    return value
}
