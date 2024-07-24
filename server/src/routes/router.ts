import { Router, Request, Response } from "express";
import { getAllUsers, getCurrentUser, loginNewUser, registerNewUser  } from "../controllers/userController"
import { verifyToken } from "./authMiddleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

router.post("/user/register", registerNewUser );
router.post("/user/login", loginNewUser );
router.get("/users", getAllUsers);

// Protected
router.get("/user", verifyToken, getCurrentUser);

export default router;
