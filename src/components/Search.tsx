import { Input } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import React from 'react';

function Search() {
  return (
    <>
      <Input
        classNames={{
          base: 'max-w-full ml-4 md:w-[20rem] h-10',
          mainWrapper: 'h-full',
          input: 'text-small',
          inputWrapper:
            'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
        }}
        placeholder='Search silver...'
        size='sm'
        startContent={<SearchIcon size={18} />}
        type='search'
      />
    </>
  );
}

export default Search;
