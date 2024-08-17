'use client';
import { AcmeLogo } from '@/components/Icons';
import Search from '@/components/Search';
import { menuItems } from '@/utils/constants';
import { Button } from '@nextui-org/button';
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
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Button
            as={'link'}
            href='/home'
            radius='sm'
            color='primary'
            className='flex items-center gap-2 p-2 text-sm max-md:w-fit max-md:self-end text-white'
          >
            <span>Explore</span>
            <ArrowUpRight size={16} />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href='/sign-up' variant='flat' radius='sm'>
            Login
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
