"use client"; // Required for client-side interactivity

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import Container from "../Container";
import { Discord, SiteLogo, X } from "../Icons";

function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Save email to your database
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle duplicate email error
        if (data.error === "Email already exists") {
          toast.error("You're already subscribed!");
        } else {
          throw new Error(data.error || "Failed to subscribe.");
        }
        return;
      }

      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative bg-background">
      <Container className="border-t dark:border-t-foreground-100">
        <div className="flex flex-col justify-between gap-10 pb-16 lg:pb-24 pt-10 lg:flex-row">
          {/* Left Section */}
          <div className="sm:col-span-3">
            <Link
              href="/"
              className="text-default-foreground mb-3 flex w-fit items-center gap-2"
            >
              <SiteLogo className="mr-1" />
              <p className="font-bold text-inherit uppercase">quillstash</p>
            </Link>
            <p className="mb-1 text-sm text-foreground-500">
              Write, share, discover
            </p>
            <p className="max-w-prose text-sm text-foreground-500">
              Quillstash &copy; {new Date().getFullYear()}
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

          {/* Newsletter Section (Centered) */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-medium text-foreground-800">
              Subscribe to Our Newsletter
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Right Section */}
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