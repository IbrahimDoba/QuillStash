import {
  Card,
  CardBody,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import Link from "next/link";

const ContentCard = ({
  title,
  summary,
  coverImage,
  onEdit,
  onDelete,
  username,
  slug,
}: any) => {
  return (
    <Card className="py-4">
      <CardBody className="flex flex-row items-center gap-4">
        <div className="w-1/3">
          <Link href={`/${username}/${slug}`}>
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-full h-full"
              src={
                coverImage ||
                "https://nextui.org/images/hero-card-complete.jpeg"
              }
            />
          </Link>
        </div>
        <div className="w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-large">{title}</h4>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions">
                {/* <DropdownItem key="edit" onPress={onEdit}>
                  Edit
                </DropdownItem> */}
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  onPress={onDelete}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <p className="text-small text-default-500">
            {summary.substring(0, 100)}...
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ContentCard;
