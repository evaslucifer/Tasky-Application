import { Task } from "../models/task.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTask = asyncHandler(async (req, res) => {
  // get task details from frontend

  // validate required fields

  // create task object

  // save task into database

  // check if task is created

  // return success response
  const { title, description, type, url } = req.body;
  if ([title, description, type].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const task = await Task.create({
    title,
    description,
    type,
    url,
    owner: req.user._id,
  });

  if (!task) {
    throw new ApiError(500, "something went wrong while creating task");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, task, "task created successfully"));
});
const getAllTasks = asyncHandler(async (req, res) => {
  // verifyJWT already executed
  // get logged in user's id
  // find all tasks of that user
  // if no tasks, return empty array
  // return success response

  const tasks = await Task.find({
    owner: req.user._id,
  }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, tasks, "success"));
});
export { createTask, getAllTasks   };
