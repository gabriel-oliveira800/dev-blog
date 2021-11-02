import { Request, Response } from "express";
import { use } from "@cubos/inject";

import axios from "axios";

import { UserService } from "../service/UserService";

import { Strings } from "../helpers";

class UserController {
  async profile(request: Request, response: Response) {
    const user_id = request.user_id;

    try {
      const result = await use(UserService).getUserInformation(user_id);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async updateUserRoles(request: Request, response: Response) {
    const { role } = request.body;
    const user_id = request.user_id;

    try {
      const result = await use(UserService).updateUserRole(user_id, role);
      return response.status(200).json(result);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { UserController };
