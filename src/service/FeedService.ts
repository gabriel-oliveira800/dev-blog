import { Post } from "@prisma/client";
import prismaClient from "../prisma";

interface Feed {
  userId: string;
  message: string;
  images: string[];
  isVisible: boolean;
}

class FeedService {
  async createFeed({
    userId,
    message,
    images,
    isVisible,
  }: Feed): Promise<Post> {
    const feed = await prismaClient.post.create({
      data: {
        message,
        images,
        userId,
        isFullAccess: isVisible,
      },
    });

    return feed;
  }

  async feedLastet(userId: string): Promise<Post[]> {
    const posts = await prismaClient.post.findMany({
      include: { user: true },
      orderBy: { created_at: "asc" },
      where: { userId, isFullAccess: true },
    });

    return posts;
  }
}

export { FeedService };
