import Container from '@/components/Container';
import { ArrowRight } from 'lucide-react';
import { Link, Button } from "@nextui-org/react";

function NotFound() {
  return (
    <Container>
      <section className='grid place-items-center pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
        <div>
          <div className='relative mx-auto flex flex-col items-center text-center lg:items-start'>
            <div className='mt-4 md:mt-6 lg:mt-8 xl:mt-10'>
              <h1 className='relative text-balance text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl xl:text-7xl'>
                Oops Something went wrong
              </h1>
            </div>
            <p className='lg:text-lef mx-auto mt-8 max-w-prose text-foreground-500 text-balance text-center text-lg md:text-wrap lg:pr-10'>
              We couln&apos;t find the page you are looking for. it may have been removed or does not exist.
            </p>
          </div>
          <div className='mt-8 flex w-full items-center justify-center'>
            <Button
              size='md'
              href='/home'
              as={Link}
              radius='sm'
              color='primary'
              className='flex items-center gap-2 px-3 py-2 text-sm max-md:w-fit max-md:self-end'
            >
              <ArrowRight className='h-4 w-4' />
              <span>Back home</span>
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default NotFound;
