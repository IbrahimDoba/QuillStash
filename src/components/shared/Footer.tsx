import Link from "next/link";
import Container from "../Container";
import { Discord, SiteLogo, X } from "../Icons";

function Footer() {
  return (
    <footer className="relative h-20 bg-background">
      <Container className="border-t dark:border-t-foreground-100">
        <div className="flex flex-col justify-between gap-10 pb-16 lg:pb-24 pt-10 lg:flex-row">
          <div className="sm:col-span-3">
          <Link href="/" className='text-default-foreground mb-3 flex w-fit items-center gap-2'>
            <SiteLogo className="mr-1" />
            <p className='font-bold text-inherit uppercase'>quillstash</p>
          </Link>
            <p className="mb-1 text-sm text-foreground-500">
              Write, share, discover
            </p>
            <p className="max-w-prose text-sm text-foreground-500">Quillstash
              &copy; {new Date().getFullYear()}
            </p>
            <ul className="mt-4 flex gap-3 items-center text-sm text-foreground-600">
              <li>
                <Link
                  href="https://x.com/DobaIbrahim"
                  target="_blank"
                  className="underline-offset-2 hover:underline flex items-center gap-2"
                >
                  <X className="size-4" /> 
                  <span>Twitter</span>
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/vkYvY4D3RA"
                  target="_blank"
                  className="underline-offset-2 hover:underline flex items-center gap-2"
                >
                 <Discord className="size-5" /> Discord
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-20">
            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Contact Us</p>
              <Link
                href="mailto:info@quillstash.com"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                Email
              </Link>
              <Link
                href="https://discord.gg/vkYvY4D3RA"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                Discord
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Legal</p>
              <Link
                href="/terms"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                Privacy
              </Link>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className="font-medium">Website</p>
              <Link
                href="/sitemap.xml"
                target="_blank"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                Sitemap
              </Link>
              <Link
                href="/feed.xml"
                target="_blank"
                className="text-foreground-600 underline-offset-2 hover:underline"
              >
                RSS Feed
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;