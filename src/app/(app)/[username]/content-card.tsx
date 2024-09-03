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
interface ContentCardProps {
  title: string;
  summary: string | null;
  coverImage: string | null;
  username: string | null;
  slug: string;
  postId: string;
  requiresAction?: boolean;
}
const ContentCard = ({
  title,
  summary,
  coverImage,
  username,
  slug,
  postId,
  requiresAction,
}: ContentCardProps) => {
  const router = useRouter()
  const deletePost = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Post deleted successfully');
        router.push(`/${username}`); 
      } else {
        toast.error('Failed to delete the post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('An error occurred while deleting the post');
    }
  };

  return (
    <Card shadow='none'>
      <CardBody className='flex flex-row items-start gap-2'>
        <div className='w-1/3'>
          <Link href={`/${username}/${slug}`}>
            <Image
              alt='Card background'
              className='object-cover rounded-lg aspect-video'
              width='180'
              height='150'
              src={
                coverImage ||
                'https://nextui.org/images/hero-card-complete.jpeg'
              }
            />
          </Link>
        </div>
        <div className='w-2/3 flex flex-col'>
          <div className='flex justify-between items-start mb-2'>
            <h4 className='font-bold text-large'>{title}</h4>
            {requiresAction && (
              <Dropdown radius='sm'>
                <DropdownTrigger>
                  <Button isIconOnly size='sm' variant='light'>
                    <MoreVertical size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Actions'>
                  <DropdownItem key='edit' href={`/edit/${slug}`}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key='delete'
                    className='text-danger'
                    color='danger'
                    onPress={deletePost}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          <p className='text-small text-default-500 line-clamp-2'>{summary}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
