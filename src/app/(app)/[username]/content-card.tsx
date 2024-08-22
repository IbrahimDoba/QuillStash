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

interface ContentCardProps {
  title: string;
  summary: string | null;
  coverImage: string | null;
  username: string | null;
  slug: string;
}
const ContentCard = ({
  title,
  summary,
  coverImage,
  username,
  slug,
}: ContentCardProps) => {
  const deleteSomething = () => {};
  const editSomething = () => {};
  return (
    <Card shadow='none' className='py-4'>
      <CardBody className='flex flex-row items-start gap-3'>
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
            <Dropdown radius='sm'>
              <DropdownTrigger>
                <Button isIconOnly size='sm' variant='light'>
                  <MoreVertical size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Actions'>
                <DropdownItem key='edit' onPress={editSomething}>
                  Edit
                </DropdownItem>
                <DropdownItem
                  key='delete'
                  className='text-danger'
                  color='danger'
                  onPress={deleteSomething}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <p className='text-small text-default-500 line-clamp-2'>{summary}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
