import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "je_dash";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

function secret(): string {
  const s = process.env.DASHBOARD_SECRET;
  if (!s) throw new Error("DASHBOARD_SECRET não configurado");
  return s;
}

// token = "<exp>.<hmac(exp)>" — sem estado no servidor, validade embutida.
function sign(exp: number): string {
  const mac = createHmac("sha256", secret()).update(String(exp)).digest("hex");
  return `${exp}.${mac}`;
}

function verify(token: string | undefined): boolean {
  if (!token) return false;
  const [expStr, mac] = token.split(".");
  if (!expStr || !mac) return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Date.now() / 1000) return false;
  const expected = createHmac("sha256", secret()).update(expStr).digest("hex");
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(input: string): boolean {
  const pw = process.env.DASHBOARD_PASSWORD;
  if (!pw) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createSession(): Promise<void> {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const store = await cookies();
  store.set(COOKIE, sign(exp), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/dashboard",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verify(store.get(COOKIE)?.value);
}
