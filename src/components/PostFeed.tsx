import { Prisma } from "@prisma/client";
import { Post } from "./Post";

type PostFeedProps = {
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
    };
  }>[];
};

export function PostFeed({ posts }: PostFeedProps) {
  return (
    <div className="flex flex-col items-center gap-7 my-10 w-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
