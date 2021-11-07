import { Follow } from "@prisma/client";
import prismaClient from "../prisma";

class FollowsService {
  async getFollows(userId: string): Promise<Follow[]> {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
      include: { Follow: true },
    });

    return user.Follow ?? [];
  }

  async createFollow(userId: string): Promise<Follow | Error> {
    const isFollowed = await prismaClient.follow.findFirst({
      where: { userId: userId },
    });

    if (isFollowed) {
      throw new Error("User isFollowed");
    }

    const follow = await prismaClient.follow.create({
      data: { userId: userId },
    });

    return follow;
  }
}

export { FollowsService };
