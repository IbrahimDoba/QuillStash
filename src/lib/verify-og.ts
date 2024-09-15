import { createHmac } from "crypto";

const secretKey = process.env.OG_SECRET_KEY || "default_secret_key";

interface OpenGraphImageParams {
  title: string;
  tag: string;
  name?: string;
}

export function generateToken(data: OpenGraphImageParams): string {
  const dataString = `${data.title}${data.tag}${data.name}`;
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
  tag,
  title,
}: OpenGraphImageParams): string {
  const token = generateToken({ title, tag, name });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const params = new URLSearchParams({ title, tkn: token });
  if (tag) params.append("tag", tag);
  if (name) params.append("name", name);
  return `${baseUrl}/api/og?${params.toString()}`;
}