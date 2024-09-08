"use client";
import { stickyRoutes, menuItems } from "@/utils/constants";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { Avatar, Button, Link, User } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { SiteLogo } from "../Icons";
import Search from "../Search";
import { ThemeSwitch } from "../ThemeSwitch";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const user = session.data?.user; // this is exposing all users data contrary to the type definition FIX!!!!

  // function getPosition() {
  //   if (stickyRoutes.some((route) => pathname.startsWith(route))) {
  //     return "sticky";
  //   } else if (pathname === "/") {
  //     return "static";
  //   } else {
  //     return;
  //   }
  // }

  return (
    <Navbar
      shouldHideOnScroll={pathname !== "/"}
      position={ pathname === "/" ? "static" : undefined }
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "max-w-screen-2xl px-4 md:px-6",
      }}
    >
      <NavbarContent>
        <NavbarBrand className="flex-grow-0">
          <Link href={user ? "/home" : "/"} className="text-default-foreground">
            <SiteLogo className="mr-1" />
            <p className="font-bold uppercase text-inherit">quillstash</p>
          </Link>
        </NavbarBrand>
        <Search />
      </NavbarContent>

      {!user ? (
        <NavbarContent justify="end" className="max-sm:hidden">
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              radius="sm"
              href="/sign-in"
              variant="flat"
            >
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} radius="sm" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent as="div" justify="end" className="flex gap-4">
          <Button
            href="/new"
            as={Link}
            color="primary"
            variant="solid"
            radius="sm"
            className="px-3 max-md:hidden"
          >
            Write
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.name ?? "user"}
                size="sm"
                src={user?.image ?? "/user-1.png"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="account"
                className="h-14 gap-2"
                href={`/${user?.username}`}
              >
                <User
                  name={user.name}
                  description={user.email}
                  avatarProps={{
                    src:
                      user?.image ??
                      "https://i.pravatar.cc/150?u=a042581f4e29026704d",
                    size: "sm",
                  }}
                />
              </DropdownItem>
              <DropdownItem key="settings" href="/account">
                Account
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                href={"https://discord.gg/vkYvY4D3RA"}
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}

      {/* theme */}
      <NavbarItem>
        <ThemeSwitch />
      </NavbarItem>

      {/* mobile toggle */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? "primary" : "foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
