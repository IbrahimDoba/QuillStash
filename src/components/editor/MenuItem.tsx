import { Button } from '@nextui-org/react';
import { LucideIcon } from 'lucide-react'; // Or your icon library

type MenuItemProps = {
  icon?: LucideIcon;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
};

export default function MenuItem({
  icon: Icon,
  title,
  action,
  isActive = null,
}: MenuItemProps) {
  return (
    <Button
      type='button'
      onClick={action}
      title={title}
      isIconOnly
      radius='sm'
      variant={isActive && isActive() ? 'flat' : 'ghost'}
      size='sm'
      className='border'
    >
      {Icon && <Icon size={18} />}
    </Button>
  );
}
