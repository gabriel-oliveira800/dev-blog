import { use } from "@cubos/inject";
import { Post } from "@prisma/client";
import prismaClient from "../prisma";
import { FilesService } from "./FilesService";

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
      orderBy: { created_at: "desc" },
      where: { userId, isFullAccess: true },
    });

    return posts;
  }

  async deleteFeedById(userId: string, feeId: string): Promise<Post | Error> {
    const currentPost = await prismaClient.post.findFirst({
      where: { id: feeId, userId },
    });

    if (currentPost == null) {
      throw new Error("Feed not found");
    }

    currentPost.images.forEach((image) => use(FilesService).deleteFile(image));
    const post = await prismaClient.post.delete({ where: { id: feeId } });

    return post;
  }
}

export { FeedService };
