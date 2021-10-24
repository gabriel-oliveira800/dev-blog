import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.post("/post", ensureAuthenticated, (req, res) => {
  return res.json({ message: `Authenticated bi user_id: ${req.user_id}` });
});

export default router;
