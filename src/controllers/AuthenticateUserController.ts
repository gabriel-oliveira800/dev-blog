import { Request, Response } from "express";
import { use } from "@cubos/inject";

import { AuthenticateUserService } from "../service/AuthenticateUserService";
import { Strings } from "../helpers";

class AuthenticateUserController {
  async handle(requst: Request, response: Response) {
    const { code } = requst.body;

    try {
      const result = await use(AuthenticateUserService).execute(code);
      return response.json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export { AuthenticateUserController };
