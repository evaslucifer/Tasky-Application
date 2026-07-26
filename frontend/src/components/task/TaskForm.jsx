import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiType,
  FiFileText,
  FiTag,
  FiImage,
  FiLoader,
  FiSave,
  FiX,
} from "react-icons/fi";

import { createTask, updateTask } from "../../api/taskApi";

function TaskForm({ taskToEdit, onClose, refreshTasks }) {
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "Personal",
      url: "",
    },
  });

  const imagePreview = watch("url");

  useEffect(() => {
    setImageError(false);
  }, [imagePreview]);

  useEffect(() => {
    if (taskToEdit) {
      reset({
        title: taskToEdit.title,
        description: taskToEdit.description,
        type: taskToEdit.type,
        url: taskToEdit.url || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        type: "Personal",
        url: "",
      });
    }
  }, [taskToEdit, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      if (taskToEdit) {
        await updateTask(taskToEdit._id, data);
        toast.success("Task updated successfully!");
      } else {
        await createTask(data);
        toast.success("Task created successfully!");
      }

      reset();
      refreshTasks();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (taskToEdit ? "Failed to update task" : "Failed to create task"),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiType className="text-indigo-600" />
          Task Title
        </label>

        <input
          type="text"
          placeholder="e.g. Build Task Management App"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          {...register("title", {
            required: "Title is required",
          })}
        />

        {errors.title && (
          <p className="mt-2 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiFileText className="text-indigo-600" />
          Description
        </label>

        <textarea
          rows={5}
          placeholder="Describe your task..."
          className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          {...register("description", {
            required: "Description is required",
          })}
        />

        {errors.description && (
          <p className="mt-2 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Type */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiTag className="text-indigo-600" />
          Category
        </label>

        <select
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          {...register("type", {
            required: "Task type is required",
          })}
        >
          <option value="Personal">🏠 Personal</option>
          <option value="Work">💼 Work</option>
          <option value="Study">📚 Study</option>
          <option value="Project">🚀 Project</option>
          <option value="Important">⭐ Important</option>
        </select>

        {errors.type && (
          <p className="mt-2 text-sm text-red-500">{errors.type.message}</p>
        )}
      </div>

      {/* Image URL */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
          <FiImage className="text-indigo-600" />
          Image URL (Optional)
        </label>

        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition-all duration-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          {...register("url")}
        />
      </div>

      {/* Image Preview */}
      <div>
        <label className="mb-3 block text-sm font-semibold text-slate-700">
          Preview
        </label>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
          {imagePreview && !imageError ? (
            <img
              src={imagePreview}
              alt="Preview"
              onError={() => setImageError(true)}
              className="h-64 w-full object-cover"
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-slate-400">
              <FiImage size={60} />
              <p className="mt-4 text-sm">
                {imagePreview
                  ? "Unable to load image."
                  : "Image preview will appear here"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-100"
        >
          <FiX />
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin" />
              {taskToEdit ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <FiSave />
              {taskToEdit ? "Update Task" : "Create Task"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
