import {
    Card,
    CardBody,
    Image,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
  } from '@nextui-org/react';
  import { MoreVertical } from 'lucide-react';
  import Link from 'next/link';
  import { toast } from 'sonner';
  import { useRouter } from 'next/navigation';
  import { useSession } from 'next-auth/react';
  interface ContentCardProps {
    title: string;
    summary: string | null;
    coverImage: string | null;
    username: string | null;
    slug: string;
    postId: string;
    requiresAction?: boolean;
  }
  
  const BookMarkContentCard = ({
    title,
    summary,
    coverImage,
    username,
    slug,
    postId,
    requiresAction,
  }: ContentCardProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const unBookmarkPost = async () => {
        if (!session?.user?.id) {
          toast.error('You must be logged in to unlike a post');
          return;
        }
    
        try {
          const response = await fetch(`/api/bookmark?postId=${postId}&userId=${session.user.id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            toast.success('Article Bookmarked successfully');
            router.refresh(); // Refresh the current page to reflect the changes
          } else {
            const data = await response.json();
            toast.error(data.message || 'Failed to Remove bookmark');
          }
        } catch (error) {
          console.error('Error unliking post:', error);
          toast.error('An error occurred while unliking the post');
        }
      };
  
    return (
      <Card shadow='none'>
        <CardBody className='flex flex-row items-center lg:items-start gap-2 max-md:px-0'>
          <div className='w-1/3'>
            <Link href={`/${username}/${slug}`}>
              <Image
                alt='Card background'
                className='object-cover rounded-lg aspect-video'
                width='180'
                height='150'
                src={coverImage || '/placeholder.jpg'}
              />
            </Link>
          </div>
          <div className='w-2/3 flex flex-col'>
            <div className='flex justify-between items-start mb-2'>
              <h4 className='font-bold lg:text-lg'>{title}</h4>
              {requiresAction && (
                <Dropdown radius='sm'>
                  <DropdownTrigger>
                    <Button isIconOnly size='sm' variant='light'>
                      <MoreVertical size={16} />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Actions'>
                    <DropdownItem
                      key='unlike'
                      className='text-danger'
                      color='danger'
                      onPress={unBookmarkPost}
                    >
                      Remove Bookmark
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
            <p className='text-xs md:text-sm text-default-500 line-clamp-2'>
              {summary}
            </p>
          </div>
        </CardBody>
      </Card>
    );
  };
  
  export default BookMarkContentCard;