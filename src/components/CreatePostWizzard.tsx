"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";

const schema = z.object({
  content: z
    .string()
    .min(1, "Your post must be at least 1 emoji long")
    .emoji({ message: "We only do emojis around here" }),
});

export function CreatePostWizzard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  type FormData = z.infer<typeof schema>;

  async function CreatePost(data: FormData) {
    await api.post("/post", data);

    router.push("/");
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex p-7 shadow-card bg-white rounded-lg items-center justify-center">
        <button
          className="flex cursor-pointer"
          onClick={() => signIn("github")}
        >
          <span>Sign in With Github</span>
          <div className="w-3" />
          <Image src="Sign-in.svg" alt="Sign in icon" width={16} height={18} />
        </button>
      </div>
    );
  }

  if (status === "loading")
    return (
      <div className="flex p-7 shadow-card bg-white rounded-lg items-center justify-center">
        <span>Loading...</span>
      </div>
    );

  return (
    <form
      className="flex p-7 shadow-card bg-white rounded-lg"
      onSubmit={handleSubmit(CreatePost)}
    >
      <Image
        src={session?.user?.image ?? ""}
        alt="User profile picture"
        width={45}
        height={45}
        className="rounded-full shadow-avatar"
      />
      <input
        type="text"
        {...register("content")}
        className="w-full mx-3 p-1"
        placeholder="Type something"
      />
      <div className="flex-1" />
      <button type="submit">
        <Image
          src="/send.svg"
          alt="Publish post button"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </button>
    </form>
  );
}
