"use client";
import { Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function SideNav() {
  const pathname = usePathname();

  const links = [
    {
      route: "/profile",
      name: "Profile",
    },
    {
      route: "/account",
      name: "Account",
    },
    {
      route: "/site",
      name: "Site settings",
    },
  ];

  console.log(pathname);

  return (
    <aside className="relative top-0 hidden h-screen lg:sticky lg:block">
      <div className="w-60 px-6 py-20">
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.route}
                className={twMerge("w-full justify-start")}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideNav;
