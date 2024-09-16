import { createHmac } from "crypto";

const secretKey = process.env.OG_SECRET_KEY || "default_secret_key";

interface OpenGraphImageParams {
  title: string;
  name?: string;
}

export function generateToken(data: OpenGraphImageParams): string {
  const dataString = `${data.title}${data.name}`;
  const hmac = createHmac("sha256", secretKey);
  hmac.update(dataString);
  return hmac.digest("hex");
}

export function verifyToken(
  data: OpenGraphImageParams,
  token: string,
): boolean {
  const expectedToken = generateToken(data);
  return token === expectedToken;
}

export function generateOgImageUrl({
  name,
  title,
}: OpenGraphImageParams): string {
  const token = generateToken({ title, name });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const params = new URLSearchParams({ title, token });
  if (name) params.append("name", name);
  return `${baseUrl}/api/og?${params.toString()}`;
}