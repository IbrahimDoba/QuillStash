'use client';
import { Button } from '@nextui-org/button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Link } from '@nextui-org/react';
import { AcmeLogo } from '@/components/Icons';
import Search from '@/components/Search';
import { ArrowUpRight } from 'lucide-react';
import { menuItems } from '@/utils/constants';

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
          <Button radius='sm' color='primary'>
            <Link
              href='/home'
              className='flex items-center gap-2 p-2 text-sm max-md:w-fit max-md:self-end text-white'
            >
              <span>Explore</span>
              <ArrowUpRight size={16} />
            </Link>
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
        {/* <NavbarMenuItem>
          <DropdownItem key='logout' color='danger' onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </NavbarMenuItem> */}
      </NavbarMenu>
    </Navbar>
  );
}
