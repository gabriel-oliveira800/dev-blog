import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";
import { FollowsController } from "../controllers/FollowsControllers";
import { UserController } from "../controllers/UserController";

const router = Router();

router.post("/authenticate", new AuthenticateUserController().handle);

router.get("/post/latest", (req, res) => {
  const messages = [
    {
      id: Math.random(),
      message:
        "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥",
      name: "Gabriel Oliveira",
      avatar_url: "https://github.com/gabriel-oliveira800.png",
    },
    {
      id: Math.random(),
      message:
        "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥",
      name: "Gabriel Oliveira",
      avatar_url: "https://github.com/gabriel-oliveira800.png",
    },
    {
      id: Math.random(),
      message:
        "Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamooo pra cima! 🔥🔥",
      name: "Gabriel Oliveira",
      avatar_url: "https://github.com/gabriel-oliveira800.png",
    },
  ];

  return res.json({ data: messages });
});

router.get("/profile", ensureAuthenticated, new UserController().profile);
router.put("/roles", ensureAuthenticated, new UserController().updateUserRoles);

router.get("/follows", ensureAuthenticated, new FollowsController().follows);
router.post("/follows", ensureAuthenticated, new FollowsController().create);

export default router;
