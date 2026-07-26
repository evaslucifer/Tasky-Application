import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  toggleTaskStatus,
} from "../controllers/task.controller.js";

const router = Router();
//create task route
//get all tasks route
router.route("/").post(verifyJWT, createTask).get(verifyJWT, getAllTasks);

//get all tasks by id route
//update task route
//delete task route

router
  .route("/:taskID")
  .get(verifyJWT, getTaskByID)
  .patch(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);
router.patch("/:taskId/toggle", verifyJWT, toggleTaskStatus);
export default router;
