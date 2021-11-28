import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Strings } from "../helpers";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: Strings.errorInvalidToken });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    if (error.message === "jwt expired") {
      return response.status(412).json({ error: error.message });
    }

    return response.status(401).json({ error: error.message });
  }
}
