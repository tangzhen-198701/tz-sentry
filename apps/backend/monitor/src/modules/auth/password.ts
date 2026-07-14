import { randomBytes, scrypt as nodeScrypt, timingSafeEqual } from 'crypto'
import { promisify } from 'util'

const scrypt = promisify(nodeScrypt)
const KEY_LENGTH = 64
const PREFIX = 'scrypt'

export async function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex')
    const key = (await scrypt(password, salt, KEY_LENGTH)) as Buffer
    return `${PREFIX}$${salt}$${key.toString('hex')}`
}

export async function verifyPassword(password: string, encoded: string): Promise<boolean> {
    const [prefix, salt, expectedHex] = encoded.split('$')
    if (prefix !== PREFIX || !salt || !expectedHex) return false

    const expected = Buffer.from(expectedHex, 'hex')
    const actual = (await scrypt(password, salt, expected.length)) as Buffer
    return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function isHashedPassword(password: string): boolean {
    return password.startsWith(`${PREFIX}$`)
}
