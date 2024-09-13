"use client";
import { Button } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { ChevronsUp } from 'lucide-react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Button
      type='button'
      tabIndex={!isVisible ? -1 : undefined}
      isIconOnly
      radius='full'
      title='Scroll to top of the page'
      className={`${
        isVisible ? 'translate-y-0' : 'translate-y-28'
      } z-50 flex items-center justify-center fixed bottom-10 right-10 transition duration-500`}
      onClick={() => scrollTo(0, 0)}
    >
      <ChevronsUp />
    </Button>
  );
}

export default ScrollToTop;
