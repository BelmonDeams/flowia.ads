import crypto from "crypto"

const ALGORITHM = "aes-256-gcm"
const IV_BYTES  = 16

function getKey(): Buffer {
  const hex = process.env.ENCRYPTION_KEY
  if (!hex || hex.length !== 64)
    throw new Error("ENCRYPTION_KEY must be 64 hex chars")
  return Buffer.from(hex, "hex")
}

export function encrypt(plaintext: string): string {
  const key    = getKey()
  const iv     = crypto.randomBytes(IV_BYTES)
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ])
  return [
    iv.toString("hex"),
    cipher.getAuthTag().toString("hex"),
    encrypted.toString("base64"),
  ].join(":")
}

export function decrypt(envelope: string): string {
  const [ivHex, tagHex, b64] = envelope.split(":")
  const key      = getKey()
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivHex, "hex")
  )
  decipher.setAuthTag(Buffer.from(tagHex, "hex"))
  return Buffer.concat([
    decipher.update(Buffer.from(b64, "base64")),
    decipher.final(),
  ]).toString("utf8")
}
