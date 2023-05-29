"use-client";

import { Time } from "@/utils/time";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type PostProps = {
  post: Prisma.PostGetPayload<{
    include: {
      author: true;
    };
  }>;
};

export function Post({ post }: PostProps) {
  const formattedPostTime = Time(post.createdAt).fromNow();

  return (
    <div className="flex p-7 shadow-card bg-white rounded-lg flex-col w-full">
      <Link href={`/user/${post.author.id}`}>
        <div className="flex">
          <Image
            src={post.author.image ?? ""}
            alt="User profile picture"
            width={45}
            height={45}
            className="rounded-full shadow-avatar"
          />
          <div className="ml-2 flex flex-col">
            <h2 className="text-xl text-gray-700">{post.author.name}</h2>
            <span className="text-xs text-gray-500">{formattedPostTime}</span>
          </div>
        </div>
      </Link>
      <span className="text-2xl mt-6">{post.content}</span>
    </div>
  );
}
