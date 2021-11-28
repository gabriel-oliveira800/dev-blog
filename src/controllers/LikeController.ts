import { Request, Response } from "express";

import { LikeService } from "../service/LikeService";
import { use } from "@cubos/inject";

class LikeController {
  async handle(requst: Request, response: Response) {
    const { feedId } = requst.params;
    const userId = requst.user_id;

    try {
      const result = await use(LikeService).execute({ feedId, userId });
      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export { LikeController };
