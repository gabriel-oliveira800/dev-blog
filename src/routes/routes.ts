import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { FollowsController } from "../controllers/FollowsControllers";
import { UserController } from "../controllers/UserController";
import { FeedController } from "../controllers/FeedController";
import { feedHandleFiles } from "../config/upload";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.get("/feed/latest", new FeedController().lastesFeed);

router.post(
  "/feed",
  ensureAuthenticated,
  feedHandleFiles,
  new FeedController().create
);

router.get("/profile", ensureAuthenticated, new UserController().profile);
router.put("/roles", ensureAuthenticated, new UserController().updateUserRoles);

router.get("/follows", ensureAuthenticated, new FollowsController().follows);
router.post("/follows", ensureAuthenticated, new FollowsController().create);

export default router;
