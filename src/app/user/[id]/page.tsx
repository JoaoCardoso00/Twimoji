import { PostFeed } from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserProfile({ params }: Props) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  const posts = await prisma.post.findMany({
    where: {
      authorId: params.id,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="max-w-md h-full mx-auto pt-7 flex flex-col items-center">
      <Image
        src={user?.image ?? ""}
        height={240}
        width={240}
        alt="user profile picture"
        className="rounded-full shadow-avatar"
      />
      <div className="my-4" />
      <h1 className="font-semibold text-5xl">{user?.name}</h1>
      <PostFeed posts={posts} />
    </main>
  );
}
