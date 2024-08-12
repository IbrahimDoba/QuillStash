import TopWriters from '@/components/homeComponents/TopWriters';
import React from 'react';
import PageContent from './page-content';
import PopularTopics from '@/components/homeComponents/PopularTopics';

const HomePage = () => {
  return (
    <div className='grid lg:grid-cols-4 my-16 gap-x-8'>
      <div className='lg:col-span-3'>
        <PageContent />
      </div>
      <div className='relative  dark:border-foreground-100'>
        <aside className='flex flex-col space-y-3 sticky top-16'>
          <PopularTopics />
          <TopWriters />
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
