import { Request, Response } from "express";
import { use } from "@cubos/inject";
import { FollowsService } from "../service/FollowsService";

class FollowsController {
  async follows(request: Request, response: Response) {
    const user_id = request.user_id;
    try {
      const result = await use(FollowsService).getFollows(user_id);
      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }

  async create(request: Request, response: Response) {
    const { userId } = request.body;

    try {
      const result = await use(FollowsService).createFollow(userId);
      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export { FollowsController };
