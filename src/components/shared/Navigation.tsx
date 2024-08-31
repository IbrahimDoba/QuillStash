'use client';
import { menuItems } from '@/utils/constants';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar';
import { Avatar, Button, Link, User } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { AcmeLogo } from '../Icons';
import Search from '../Search';
import MobileSearch from '../MobileSearch';
import { ThemeSwitch } from '../ThemeSwitch';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user; // this is exposing all users data contrary to the type definition FIX!!!! 

  return (
    <Navbar
      shouldHideOnScroll
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
        <NavbarBrand className='flex-grow-0'>
          <Link href='/home' className='text-default-foreground'>
            <AcmeLogo />
            <p className='font-bold text-inherit'>ACME</p>
          </Link>
        </NavbarBrand>
        <Search />
        <MobileSearch/>
      </NavbarContent>

      {!user ? (
        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='/sign-in'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='primary' href='/sign-up' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent as='div' justify='end' className='flex gap-4'>
          <Button
            href='/new'
            as={Link}
            color='primary'
            variant='solid'
            radius='sm'
            className='max-md:hidden px-3'
          >
            Write
          </Button>
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Avatar
                as='button'
                className='transition-transform'
                color='secondary'
                name={user?.name ?? 'site user'}
                size='sm'
                src={
                  user?.image ??
                  'https://i.pravatar.cc/150?u=a042581f4e29026704d'
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem
                key='profile'
                className='h-14 gap-2'
                href={`/${user?.username}`} 
              >
                {/* <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>
                  {user?.email ?? 'zoey@example.com'}
                </p> */}
                <User
                  name='Jane Doe'
                  description='Product Designer'
                  avatarProps={{
                    src:
                      user?.image ??
                      'https://i.pravatar.cc/150?u=a042581f4e29026704d',
                      size: 'sm',
                  }}
                />
              </DropdownItem>
              <DropdownItem key='settings' href='/profile'>
                Settings
              </DropdownItem>
              <DropdownItem key='analytics' href='/analytics'>
                Analytics
              </DropdownItem>
              <DropdownItem key='help_and_feedback' href='/help'>
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
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
        <NavbarMenuItem>
          <DropdownItem key='logout' color='danger' onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
