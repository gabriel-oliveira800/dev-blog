import { Like } from "@prisma/client";
import prismaClient from "../prisma";

interface LikeServiceRequest {
  feedId: string;
  userId: string;
}

class LikeService {
  async execute({ feedId, userId }: LikeServiceRequest): Promise<Like | Error> {
    const post = await prismaClient.post.findFirst({
      where: { id: feedId },
    });

    if (post === null) {
      throw new Error("Feed not found");
    }

    const like = await prismaClient.like.create({
      data: { postId: feedId, userId },
    });

    return like;
  }
}

export { LikeService };
