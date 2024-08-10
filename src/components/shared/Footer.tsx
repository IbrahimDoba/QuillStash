import Link from 'next/link';
import Container from '../Container';

function Footer() {
  return (
    <footer className='min-h-20 relative border-t dark:border-foreground-50 py-10'>
      <Container>
        <div className='h-full flex flex-col md:flex-row md:justify-between justify-center items-center'>
          <div className='text-center md:text-left pb-2 md:pb-0'>
            <p className='text-sm text-foreground'>
              &copy; {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          <div className='flex items-center justify-center'>
            <div className='flex space-x-8'>
              <Link
                href='/about'
                className='text-sm text-foreground hover:underline'
              >
                About
              </Link>
              <Link
                href='terms'
                className='text-sm text-foreground hover:underline'
              >
                Terms
              </Link>
              <Link
                href='/privacy'
                className='text-sm text-foreground hover:underline'
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;