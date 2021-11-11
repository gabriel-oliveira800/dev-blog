import { User, Role } from "@prisma/client";
import prismaClient from "../prisma";

class UserService {
  async getUserInformation(userId: string): Promise<User | Error> {
    const user = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (user) {
      return user;
    }

    throw new Error("User not found");
  }

  async updateUserRole(userId: string, role: Role): Promise<User | Error> {
    const currentUser = await prismaClient.user.findFirst({
      where: { id: userId },
    });

    if (currentUser == null) {
      throw new Error("User not found");
    }

    const roleisValid = ["ADMIN", "USER"].includes(role);
    if (!roleisValid) {
      throw new Error("Role is not valid");
    }

    const user = await prismaClient.user.update({
      data: { role },
      where: { id: userId },
    });

    return user;
  }
}

export { UserService };
