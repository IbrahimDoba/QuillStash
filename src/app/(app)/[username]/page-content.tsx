"use client";
import { PostAuthor } from "@/types";
import { Calendar, Edit, LinkIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Card, CardBody, Avatar, Button, Tabs, Tab } from "@nextui-org/react";
import { toast } from "sonner";


 export interface ProfileData {
  username: string;
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  password: string | null;
  image: string | null;
  role: string | null;
  bio: string | null; // Update this to allow null
  location: string | null;
  pronouns: string | null;
  work: string | null;
  github: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function PageContent({
  name,
  email,
  username,
  createdAt,
  bio,
  image,
  github,
}: ProfileData) {
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", { position: "top-right" });
  };

  return (
    <section className="px-6 py-10 md:px-2 mx-auto max-w-screen-sm">
      {/* profile details */}
      <div className="flex flex-col justify-between gap-4 pb-4">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-bold lg:text-xl">{name ?? "Ibrahim doba"}</p>
              <p className="text-sm">{email ?? "silverfangs@gmail.com"}</p>
              <p className="text-sm text-foreground-500">
                @{username ?? "silverfangs"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={github ?? "https://github.com/ibrahimdoba"}
                target="_blank"
                className="text-blue flex items-center gap-1 text-sm font-medium"
              >
                <LinkIcon size={16} />
                Github
              </Link>
              <span className="flex items-center gap-1 text-sm">
                <Calendar size={16} />
                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <p className="text-sm text-foreground-500">
              {bio ?? "404 bio not found"}
            </p>
          </div>
          <Avatar
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-24 h-24 text-large"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <Button radius="sm" color="primary">
            <Link
              href={"/profile/edit"}
              className="flex items-center gap-2 px-3 py-2 text-sm max-md:w-fit max-md:self-end"
            >
              <span>Edit profile</span>
            </Link>
          </Button>
          <Button radius="sm" onClick={() => copyLink()}>
            <LinkIcon size={16} />
            <span>Copy link</span>
          </Button>
          <Button radius="sm" isIconOnly>
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>

      {/* profile data */}
      <div className="mt-6">
        <Tabs aria-label="Options" radius="sm">
          <Tab key="posts" title="Posts">
            <Card
              shadow="none"
              className="bg-transparent flex items-center justify-center py-10"
            >
              <Edit />
              <p>This user has no posts yet. Check back later.</p>
            </Card>
          </Tab>
          <Tab key="bookmarks" title="Bookmarks">
            <Card shadow="none" className="bg-transparent">
              <CardBody>
                This user has no bookmarks yet. Check back later.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="likes" title="Likes">
            <Card shadow="none" className="bg-transparent">
              <CardBody>This user has no likes yet. Check back later.</CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
