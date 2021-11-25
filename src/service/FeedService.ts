import { use } from "@cubos/inject";
import { Post, Role } from "@prisma/client";
import prismaClient from "../prisma";
import { FilesService } from "./FilesService";

interface Feed {
  userId: string;
  message: string;
  images: string[];
  isVisible: boolean;
}

interface DeleteFeedRequest {
  feedId: string;
  userId: string;
  adminId: string;
}

interface FeedPaginate {
  page?: number;
  limit?: number;
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

  async getAllFeeds({ page, limit }: FeedPaginate): Promise<Post[]> {
    const ship = (page - 1) * limit;

    const posts = await prismaClient.post.findMany({
      take: limit,
      include: { user: true },
      skip: ship > 0 ? ship : 0,
      orderBy: { created_at: "desc" },
    });

    return posts;
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

    const post = await prismaClient.post.delete({ where: { id: feeId } });
    currentPost.images.forEach((image) => use(FilesService).deleteFile(image));

    return post;
  }

  async deleteFeedByIdWithAdmin({
    feedId,
    userId,
    adminId,
  }: DeleteFeedRequest): Promise<Post | Error> {
    const adminUser = await prismaClient.user.findFirst({
      where: { id: adminId },
    });

    if (adminUser === null) {
      throw new Error("User not found");
    }

    if (adminUser.role !== Role.ADMIN) {
      throw new Error("User is not admin");
    }

    return await this.deleteFeedById(userId, feedId);
  }
}

export { FeedService };
