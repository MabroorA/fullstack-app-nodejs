import { Router, Request, Response } from "express";
import { getAllUsers, getUser, loginNewUser, registerNewUser  } from "../controllers/userController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  console.log("Server Working");
  res.send("Express + TypeScript Server");
});

router.post("/user/register", registerNewUser );
router.post("/user/login", loginNewUser );
router.get("/user/:email", getUser);
router.get("/users", getAllUsers);

export default router;
