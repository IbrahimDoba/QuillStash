'use client';

import { Button } from '@nextui-org/react';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {theme === 'light' ? (
        <Button onClick={() => setTheme('dark')} isIconOnly variant='light'>
          <Sun size={18} className='shrink-0'/>
        </Button>
      ) : (
        <Button onClick={() => setTheme('light')} isIconOnly variant='light'>
          <MoonStar size={18} className='shrink-0'/>
        </Button>
      )}
    </div>
  );
}
