import { Request, Response } from "express";
import { use } from "@cubos/inject";

import { FilesService } from "../service/FilesService";
import { FeedService } from "../service/FeedService";

class FeedController {
  async create(request: Request, response: Response) {
    const { message, isVisible } = request.body;

    const files = request.files as Express.Multer.File[];
    const userId = request.user_id;

    try {
      let images = [];

      if (files) {
        images = files.map((file) => use(FilesService).saveFile(file));
      }

      const result = await use(FeedService).createFeed({
        images,
        message,
        userId,
        isVisible: JSON.parse(isVisible),
      });

      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }

  async lastesFeed(request: Request, response: Response) {
    const user_id = request.user_id;
    try {
      const result = await use(FeedService).feedLastet(user_id);
      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export { FeedController };
