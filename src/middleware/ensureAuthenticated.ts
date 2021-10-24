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
  const authTopken = request.headers.authorization;

  if (!authTopken) {
    return response.status(401).json({ error: Strings.errorInvalidToken });
  }

  const [, token] = authTopken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).json({ error: error.message });
  }
}
