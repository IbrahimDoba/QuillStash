import { Button } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import React from 'react';

function MobileSearch() {
  return (
    <>
      <Button isIconOnly className='lg:hidden' size='sm' radius='sm'>
         <SearchIcon size={18} />
      </Button>
    </>
  );
}

export default MobileSearch;
