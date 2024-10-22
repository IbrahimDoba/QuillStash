"use client";
import { Post, Tag, User as UserType } from "@/db/schema";
import useDebounce from "@/hooks/useDebounce";
import {
  Card,
  CardBody,
  Input,
  User,
  Chip,
  Tabs,
  Tab,
  Image,
} from "@nextui-org/react";
import { FileSearch, SearchIcon, Users, FileText, Tags } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Skeleton,
} from "@nextui-org/react";
import { calculateReadTime } from "@/utils/caluclate-readtime";

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
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchSite = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search?query=${debouncedSearchTerm}`,
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data: SearchResponse = await res.json();
    return data;
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: searchSite,
    enabled: !!debouncedSearchTerm,
    refetchOnWindowFocus: false,
    staleTime: 60 * 3600,
  });

  return (
    <>
      <Button
        onPress={onOpen}
        radius="sm"
        size="md"
        disableRipple
        disableAnimation
        startContent={
          <SearchIcon className="size-4 text-foreground-600 lg:size-5" />
        }
        className="min-w-80 justify-start text-foreground-600 max-lg:hidden"
      >
        Search...
      </Button>
      <Button
        onPress={onOpen}
        isIconOnly
        disableRipple
        disableAnimation
        size="sm"
        radius="sm"
        className="lg:hidden"
      >
        <span className="sr-only">Search website</span>
        <SearchIcon size={18} className="text-foreground-500" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        closeButton={<span className="sr-only pointer-events-none" />}
        size="xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 border-b px-0 py-2.5 dark:border-foreground-100">
              <Input
                autoFocus
                isClearable
                onValueChange={setSearchTerm}
                startContent={
                  <SearchIcon className="size-4 text-foreground-500 lg:size-6" />
                }
                placeholder="Search quillstash..."
                radius="none"
                variant="bordered"
                classNames={{
                  input: "text-base",
                  inputWrapper:
                    "font-normal text-default-500 border-none shadow-none",
                }}
              />
            </ModalHeader>
            <ModalBody className="min-h-80 py-4">
              {!debouncedSearchTerm && (
                <div className="grid h-full place-items-center gap-3 py-20">
                  <FileSearch size={64} className="text-foreground-500" />
                  What are you looking for?
                </div>
              )}

              {isLoading && (
                <div className="min-h-36 min-w-full">
                  <Skeleton className="h-[280px] min-w-full rounded-md" />
                </div>
              )}

              {isSuccess && debouncedSearchTerm && (
                <Tabs
                  aria-label="Search results"
                  radius="none"
                  variant="solid"
                  fullWidth
                >
                  <Tab
                    key="articles"
                    title={
                      <div className="flex items-center gap-2">
                        <FileText size={18} />
                        <span>Articles ({data.posts.length})</span>
                      </div>
                    }
                  >
                    {data.posts.length ? (
                      <ul className="flex flex-col gap-3">
                        {data.posts.map((post) => (
                          <li key={post.id}>
                            <Card
                              shadow="sm"
                              radius="sm"
                              className="bg-background"
                            >
                              <CardBody className="flex flex-row gap-4">
                                <Image
                                  src={
                                    post.coverImage ||
                                    "https://avatar.vercel.sh"
                                  }
                                  alt={post.title}
                                  width={130}
                                  height={80}
                                  radius="sm"
                                />
                                <Link
                                  href={`/${post.author.username}/${post.slug}`}
                                  className="flex flex-col justify-between"
                                >
                                  <div>
                                    <p className="line-clamp-1 font-semibold">
                                      {post.title}
                                    </p>
                                    <p className="line-clamp-1 text-sm">
                                      {post.summary}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-foreground-500 hidden sm:block">
                                      <time>
                                        {new Date(
                                          post.createdAt,
                                        ).toLocaleDateString("en-US", {
                                          day: "numeric",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                      </time>
                                    </span>
                                    <span className="size-[2px] bg-foreground hidden sm:block" />
                                    <span className="text-xs text-foreground-500">
                                      {calculateReadTime(post.body)} mins read
                                    </span>
                                  </div>
                                </Link>
                              </CardBody>
                            </Card>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        icon={<FileText size={48} />}
                        message="No articles found"
                      />
                    )}
                  </Tab>
                  <Tab
                    key="authors"
                    title={
                      <div className="flex items-center gap-2">
                        <Users size={18} />
                        <span>Authors ({data.users.length})</span>
                      </div>
                    }
                  >
                    {data.users.length ? (
                      <ul className="flex flex-wrap gap-4 py-4">
                        {data.users.map((user) => (
                          <li key={user.id}>
                            <Link href={`/${user.username}`}>
                              <User
                                name={user.name}
                                description={`@${user.username}`}
                                avatarProps={{
                                  src: user.image ?? "/user-1.png",
                                }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        icon={<Users size={48} />}
                        message="No authors found"
                      />
                    )}
                  </Tab>
                  <Tab
                    key="tags"
                    title={
                      <div className="flex items-center gap-2">
                        <Tags size={18} />
                        <span>Topics ({data.tags.length})</span>
                      </div>
                    }
                  >
                    {data.tags.length ? (
                      <ul className="flex flex-wrap items-center gap-3 py-4">
                        {data.tags.map((tag) => (
                          <li key={tag.id}>
                            <Link href={`/tag/${tag.slug}`}>
                              <Chip
                                size="lg"
                                color="default"
                                className="text-sm capitalize"
                              >
                                #{tag.name}
                              </Chip>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <EmptyState
                        icon={<Tags size={48} />}
                        message="No topics found"
                      />
                    )}
                  </Tab>
                </Tabs>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}

function EmptyState({
  icon,
  message,
}: {
  icon: React.ReactNode;
  message: string;
}) {
  return (
    <div className="flex h-48 flex-col items-center justify-center gap-4 text-foreground-500">
      {icon}
      <p>{message}</p>
    </div>
  );
}
