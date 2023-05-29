import { CreatePostWizzard } from "@/components/CreatePostWizzard";
import { PostFeed } from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-md h-full mx-auto pt-7">
      <CreatePostWizzard />
      <PostFeed posts={posts} />
    </main>
  );
}
