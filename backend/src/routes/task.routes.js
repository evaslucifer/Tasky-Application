import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask, getAllTasks } from "../controllers/task.controller.js";

const router = Router();
router.route("/create-task").post(verifyJWT, createTask);
router.route("/getAllTasks").get(verifyJWT, getAllTasks);
export default router;
