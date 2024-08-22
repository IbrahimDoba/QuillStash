'use client';
import { AcmeLogo } from '@/components/Icons';
import Search from '@/components/Search';
import MobileSearch from '@/components/MobileSearch';
import { menuItems } from '@/utils/constants';
import { Button } from '@nextui-org/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

export default function AlternateNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      position='static'
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: 'max-w-screen-2xl',
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand className='grow-0'>
          <Link href='/home' className='text-default-foreground'>
            <AcmeLogo />
            <p className='font-bold text-inherit'>SILVER</p>
          </Link>
        </NavbarBrand>
        <Search />
        <MobileSearch />
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Button variant='flat' radius='sm'>
            Sign up
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={index === 2 ? 'primary' : 'foreground'}
              className='w-full'
              href={item.href}
              size='lg'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
