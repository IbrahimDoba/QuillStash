"use client";
import { Calendar, Edit, LinkIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Card, Avatar, Button, Tabs, Tab } from "@nextui-org/react";
import { toast } from "sonner";
import { Draft, User as ProfileData, Post as UserPosts } from "@/db/schema";
import { useSession } from "next-auth/react";
import ContentCard from "./content-card";
import LinksModal from "./links-modal";
import DraftContentCard from "@/app/(write)/draft/draft-card-content";

interface PageContentProps extends ProfileData {
  isCurrentUser: boolean;
  posts: UserPosts[];
  drafts: Draft[];
  bookmarks: {
    postId: string;
    post: {
      id: string;
      title: string;
      summary: string | null;
      coverImage: string | null;
      slug: string;
    };
  }[];
  likes: {
    postId: string;
    post: {
      id: string;
      title: string;
      summary: string | null;
      slug: string;
      coverImage: string | null;
    };
  }[];
}

export default function PageContent({
  name,
  email,
  username,
  createdAt,
  bio,
  image,
  website,
  isCurrentUser,
  posts,
  bookmarks,
  drafts,
  likes,
  socials,
}: PageContentProps) {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard", { position: "top-right" });
  };

  const session = useSession();

  return (
    <section className="px-6 py-10 md:px-2 mx-auto max-w-screen-sm">
      {/* profile details */}
      <div className="flex flex-col justify-between gap-4 pb-4">
        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-bold lg:text-xl">{name}</p>
              {isCurrentUser && <p className="text-sm">{email}</p>}

              {/* maybe we shouldnt show the user email for everyone to see */}
              <p className="text-sm text-foreground-500">@{username}</p>
            </div>
            <div className="flex items-center gap-4">
              <LinksModal name={name} website={website} socials={socials} />
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
            src={image ?? "https://i.pravatar.cc/150?u=a04258114e29026708c"}
            className="w-24 h-24 text-large"
          />
        </div>
        <div className="gap-4 flex">
          {isCurrentUser && (
            <div className="gap-4 flex w-fit">
              <Button radius="sm" color="primary">
                <Link
                  href={"/profile/edit"}
                  className="flex items-center gap-2 px-3 py-2 text-sm max-md:w-fit max-md:self-end"
                >
                  <span>Edit profile</span>
                </Link>
              </Button>
              <Button radius="sm">
                <Link
                  href={"/new"}
                  className="flex items-center gap-2 px-3 py-2 text-sm max-md:w-fit max-md:self-end"
                >
                  <span>New post</span>
                </Link>
              </Button>
            </div>
          )}
          {/* <Button radius='sm' onClick={() => copyLink()}>
            <LinkIcon size={16} />
            <span>Copy link</span>
          </Button> */}
          {/* <Button radius="sm" isIconOnly>
            <MoreHorizontal size={16} />
          </Button> */}
        </div>
      </div>

      {/* user data */}
      <div className="mt-6">
        <Tabs aria-label="Options" radius="sm" fullWidth>
          <Tab key="posts" title="Posts">
            {posts && posts.length > 0 ? (
              <div className="grid gap-4">
                {posts.map((post) => (
                  <ContentCard
                    postId={post.id}
                    key={post.id}
                    title={post.title}
                    summary={post.summary}
                    coverImage={post.coverImage}
                    username={username}
                    slug={post.slug}
                    requiresAction={isCurrentUser} 
                  />
                ))}
              </div>
            ) : (
              <Card
                shadow="none"
                className="bg-transparent flex items-center justify-center py-10 lg:py-20"
              >
                <Edit />
                <p>You have no posts yet. Write a post and Check back later.</p>
              </Card>
            )}
          </Tab>
          {isCurrentUser && (
            <Tab key="drafts" title="Drafts">
              {drafts && drafts.length > 0 ? (
                <div className="grid gap-4">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="py-4">
                      <DraftContentCard
                        username={username}
                        id={draft.id}
                        key={draft.id}
                        title={draft.title}
                        summary={draft.summary}
                        coverImage={draft.coverImage}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <Card
                  shadow="none"
                  className="bg-transparent flex items-center justify-center py-10 lg:py-20"
                >
                  <Edit />
                  <p>Anything saved to your drafts will appear here.</p>
                </Card>
              )}
            </Tab>
          )}
          {isCurrentUser && (
            <Tab key="bookmarks" title="Bookmarks">
              {bookmarks && bookmarks.length > 0 ? (
                <div className="grid gap-4">
                  {bookmarks.map((bookmark) => (
                    <ContentCard
                      postId={bookmark.post.id}
                      username={username}
                      slug={bookmark.post.slug}
                      key={bookmark.post.id}
                      title={bookmark.post.title}
                      summary={bookmark.post.summary}
                      coverImage={bookmark.post.coverImage}
                      requiresAction={isCurrentUser} 
                    />
                  ))}
                </div>
              ) : (
                <Card
                  shadow="none"
                  className="bg-transparent flex items-center justify-center py-10 lg:py-20"
                >
                  <Edit />
                  <p>You have no bookmarks yet. Check back later.</p>
                </Card>
              )}
            </Tab>
          )}

          <Tab key="likes" title="Likes">
            {likes && likes.length > 0 ? (
              <div className="grid gap-4">
                {likes.map((like) => (
                  <ContentCard
                    postId={like.post.id}
                    username={username}
                    slug={like.post.slug}
                    key={like.post.id}
                    title={like.post.title}
                    summary={like.post.summary}
                    coverImage={like.post.coverImage}
                    requiresAction={isCurrentUser} 
                  />
                ))}
              </div>
            ) : (
              <Card
                shadow="none"
                className="bg-transparent flex items-center justify-center py-10 lg:py-20"
              >
                <Edit />
                <p>You have no likes yet. Check back later.</p>
              </Card>
            )}
          </Tab>
        </Tabs>
      </div>
    </section>
  );
}
