'use client';
import { Post, Tag, User as UserType } from '@/db/schema';
import useDebounce from '@/hooks/useDebounce';
import {
  Card,
  CardBody,
  Input,
  User,
  Chip,
} from '@nextui-org/react';
import { FileSearch, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Skeleton,
} from '@nextui-org/react';

interface PostWithAuthor extends Post {
  author: UserType;
}

interface SearchResponse {
  posts: PostWithAuthor[] | [];
  tags: Tag[] | [];
  users: UserType[] | [];
}

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchSite = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${debouncedSearchTerm}`
    );
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data: SearchResponse = await res.json();
    return data;
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: searchSite,
    enabled: !!debouncedSearchTerm,
    refetchOnWindowFocus: false,
    staleTime: 60 * 3600,
  });

  const noResults =
    !data?.posts.length && !data?.tags.length && !data?.users.length;

  return (
    <>
      <Button
        onPress={onOpen}
        radius='sm'
        size='md'
        disableRipple
        disableAnimation
        startContent={
          <SearchIcon className='size-4 lg:size-5 text-foreground-600' />
        }
        className='text-foreground-600 max-lg:hidden min-w-80 justify-start'
      >
        Search...
      </Button>
      <Button
        onPress={onOpen}
        isIconOnly
        size='sm'
        radius='sm'
        className='lg:hidden'
      >
        <SearchIcon size={18} className='text-foreground-500' />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='center'
        radius='sm'
        closeButton={<span className='sr-only pointer-events-none' />}
        size='xl'
        scrollBehavior='inside'
      >
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1 border-b dark:border-foreground-100 px-0 py-2.5'>
              <Input
                autoFocus
                isClearable
                onValueChange={setSearchTerm}
                startContent={
                  <SearchIcon className='size-4 lg:size-6 text-foreground-500' />
                }
                placeholder='Search quillstash...'
                radius='none'
                variant='bordered'
                classNames={{
                  input: 'text-base',
                  inputWrapper:
                    'font-normal text-default-500 border-none shadow-none',
                }}
              />
            </ModalHeader>
            <ModalBody className='min-h-80 py-4 block'>
              {!debouncedSearchTerm && (
                <div className='h-full py-20 gap-3 grid place-items-center'>
                  <FileSearch size={64} className='text-foreground-500' />
                  What are you looking for?
                </div>
              )}

              {isLoading && (
                <div className='flex flex-col gap-4'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <SearchSkeleton key={i} />
                  ))}
                </div>
              )}

              {isSuccess && <SearchResults {...data} />}

              {debouncedSearchTerm && !isLoading && noResults && (
                <div className='flex flex-col gap-1 items-center text-center'>
                  <span>No results found for</span>
                  <strong>&quot;{searchTerm}&quot;</strong>
                </div>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function SearchSkeleton() {
  return <Skeleton className='w-full h-14 rounded-md' />;
}

function SearchResults({ posts, tags, users }: SearchResponse) {
  return (
    <div className='space-y-8'>
      {posts.length ? (
        <section>
          <h3 className='font-bold text-center mb-4'>Posts</h3>
          <ul className='flex flex-col gap-3'>
            {posts.map((post) => (
              <li key={post.id}>
                <Card shadow='sm' radius='sm' className='bg-background'>
                  <CardBody>
                    <Link href={`/${post.author.username}/${post.slug}`}>
                      <p className='font-semibold line-clamp-1 mb-1'>
                        {post.title}
                      </p>
                      <p className='text-sm line-clamp-2'>{post.summary}</p>
                    </Link>
                  </CardBody>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {users.length ? (
        <section>
          <h3 className='font-semibold text-center mb-4'>Users</h3>
          <ul className='flex flex-wrap gap-3'>
            {users.map((user) => (
              <li key={user.id}>
                <User
                  name={user.name}
                  description={
                    <Link href={`/${user.username}`}>
                      {`@${user.username}`}
                    </Link>
                  }
                  avatarProps={{
                    src: user.image ?? '/user-1.png',
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tags.length ? (
        <section>
          <h3 className='font-semibold text-center mb-4'>Topics</h3>
          <ul className='flex flex-wrap items-center gap-3'>
            {tags.map((tag) => (
              <li key={tag.id}>
                <Link href={`/tag/${tag.slug}`}>
                  <Chip size='lg' color='primary' className='capitalize'>
                    {tag.name}
                  </Chip>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
