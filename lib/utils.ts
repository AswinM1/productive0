import { randomBytes, createHash } from "crypto";
export { cn } from "cn"
// lib/tokens.ts

const TOKEN_PREFIX = "ptk_"; // "productivity tracker key"

export function generateToken() {
  const raw = randomBytes(32).toString("hex");
  const token = `${TOKEN_PREFIX}${raw}`;
  return token;
}

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function previewToken(token: string) {
  return token.slice(-4);
}