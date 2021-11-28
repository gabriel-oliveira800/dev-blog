import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { FollowsController } from "../controllers/FollowsControllers";
import { UserController } from "../controllers/UserController";
import { FeedController } from "../controllers/FeedController";
import { LikeController } from "../controllers/LikeController";
import { feedHandleFiles } from "../config/upload";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.get("/feed/latest", new FeedController().lastesFeed);

router.get("/feeds", new FeedController().getAllFeeds);

router.post(
  "/feed",
  ensureAuthenticated,
  feedHandleFiles,
  new FeedController().create
);

router.delete(
  "/feed/:feedId",
  ensureAuthenticated,
  new FeedController().deleteFeedById
);

router.delete(
  "/admin/feed/:userId/:feedId",
  ensureAuthenticated,
  new FeedController().deleteFeedByIdWithAdmin
);

router.get("/profile", ensureAuthenticated, new UserController().profile);
router.put("/roles", ensureAuthenticated, new UserController().updateUserRoles);

router.get("/follows", ensureAuthenticated, new FollowsController().follows);
router.post("/follows", ensureAuthenticated, new FollowsController().create);

router.post("/like/:feedId", ensureAuthenticated, new LikeController().handle);

export default router;
