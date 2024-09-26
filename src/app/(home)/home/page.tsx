import TopWriters from '@/components/top-writers';
import React from 'react';
import PageContent from './page-content';
import PopularTags from '@/components/popular-tags';
import { Metadata } from 'next';
import DiscordCard from '@/components/DiscordCard';

export const metadata: Metadata = {
  title: 'Explore',
  description: 'explore our dynamic feed',
};

const HomePage = () => {
  return (
    <div className='grid lg:grid-cols-4 my-16 gap-x-8'>
      <div className='lg:col-span-3 xl:pr-16'>
        <PageContent />
      </div>
      <div className='relative dark:border-foreground-100'>
        <aside className='lg:flex flex-col space-y-3 md:sticky top-16 hidden'>
          <PopularTags />
          {/* <TopWriters /> */}
          <DiscordCard/>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
