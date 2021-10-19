import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const { name } = req.query;
  return res.status(200).json({ message: `Hello Word ${name}` });
});

export default router;
