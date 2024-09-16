import { generateOgImage } from "./template";
import { loadFonts } from "./fonts";
import { verifyToken } from "@/lib/verify-og";
import getSession from "@/lib/getSession";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const hasTitle = searchParams.get("title");
  const token = searchParams.get("token") || "";
  const name = searchParams.get("name") || undefined;

  const session = await getSession();
  const image = session?.user.image || undefined;

  if (!hasTitle) {
    return new Response("Missing title", { status: 400 });
  }
  const title = hasTitle && hasTitle.length > 90 ? hasTitle.slice(0, 90) + "..." : hasTitle;

  const isAllowed = verifyToken({ title, name }, token);

  if (!isAllowed) {
    return new Response("Invalid token.", { status: 401 });
  }
  
  const fonts = await loadFonts();

  return generateOgImage({ title, name, image }, fonts);
}
