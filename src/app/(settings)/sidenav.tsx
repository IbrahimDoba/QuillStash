"use client";
import { Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function SideNav() {
  const pathname = usePathname();

  const links = [
    {
      route: "/home",
      name: "Home",
    },
    {
      route: "/profile",
      name: "Profile",
    },
    {
      route: "/account",
      name: "Account",
    },
  ];

  console.log(pathname);

  return (
    <aside className="relative top-0 hidden h-screen md:sticky md:block border-r dark:border-r-foreground-50">
      <div className="w-60 px-6 py-20">
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.name}>
              <Button
                href={link.route}
                variant={pathname === link.route ? "flat" : "ghost"}
                radius="sm"
                as={Link}
                className={twMerge("w-full justify-start border-none")}
              >
                {link.name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default SideNav;
