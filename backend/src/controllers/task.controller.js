import mongoose from "mongoose";
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
const getTaskByID = asyncHandler(async (req, res) => {
  // get taskId from params
  // validate taskId
  // find task
  // make sure task belongs to logged-in user
  // if task not found throw error
  // return success response

  const { taskID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    throw new ApiError(400, "Invalid Task ID");
  }

  const task = await Task.findOne({
    _id: taskID,
    owner: req.user._id,
  });
  if (!task) {
    throw new ApiError(404, "task not found");
  }
  return res.status(200).json(new ApiResponse(200, task, "success"));
});
const updateTask = asyncHandler(async (req, res) => {
  // get taskId
  // validate ObjectId
  // extract editable fields
  // if no editable fields are provided
  // throw ApiError(400)
  // update only the provided fields
  // save/update
  // return updated task

  const { taskID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    throw new ApiError(400, "Invalid task id");
  }
  const { title, description, type, url, isCompleted } = req.body;
  const allowedFields = ["title", "description", "type", "url", "isCompleted"];

  const hasUpdate = allowedFields.some(
    (field) => req.body[field] !== undefined
  );

  if (!hasUpdate) {
    throw new ApiError(400, "At least one field is required");
  }
  const updateFields = {};

  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (type !== undefined) updateFields.type = type;
  if (url !== undefined) updateFields.url = url;
  if (isCompleted !== undefined) updateFields.isCompleted = isCompleted;
  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskID, owner: req.user._id },
    { $set: updateFields },
    { new: true, runValidators: true }
  );
  if (!updatedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated successfully"));
});
const deleteTask = asyncHandler(async (req, res) => {
  // get taskId from params
  // validate ObjectId
  // find the task that belongs to the logged-in user
  // if task doesn't exist, throw ApiError(404)
  // delete the task
  // return success response
  const { taskID } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskID)) {
    throw new ApiError(400, "Invalid task ID");
  }
  const deletedTask = await Task.findOneAndDelete({
    _id: taskID,
    owner: req.user._id,
  });
  if (!deletedTask) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedTask, "Task deleted successfully"));
});
const toggleTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findOne({
    _id: taskId,
    owner: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  task.isCompleted = !task.isCompleted;

  await task.save();

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});
export {
  createTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
  toggleTaskStatus,
};
