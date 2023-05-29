import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  const { content } = await req.json();

  if (!content) {
    return {
      status: 400,
      body: {
        error: "Missing post content",
      },
    };
  }

  if (!session || !session?.user) {
    return {
      status: 401,
      body: {
        error: "Unauthorized",
      },
    };
  }

  if (!session.user.email) {
    return {
      status: 400,
      body: {
        error: "Missing email",
      },
    };
  }

  await prisma.post.create({
    data: {
      content: content as string,
      author: {
        connect: {
          email: session.user.email,
        },
      },
    },
  });

  return NextResponse.json({
    message: "Post created",
  });
}
