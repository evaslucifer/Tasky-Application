import { useState } from "react";
import { FiCalendar, FiEdit2, FiTrash2, FiImage } from "react-icons/fi";

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-56 w-full bg-slate-100">
        {task.url && !imageError ? (
          <img
            src={task.url}
            alt={task.title}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-slate-400">
            <FiImage size={50} />
            <p className="mt-3 text-sm font-medium">No Image Available</p>
          </div>
        )}

        {/* Type Badge */}
        <span className="absolute right-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
          {task.type}
        </span>
      </div>

      {/* Card Body */}
      <div className="space-y-4 p-5">
        {/* Status */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => onToggle(task._id)}
              className="h-5 w-5 accent-green-600"
            />

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                task.isCompleted
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.isCompleted ? "Completed" : "Pending"}
            </span>
          </label>
        </div>

        {/* Title */}
        <h2
          className={`line-clamp-1 text-xl font-bold ${
            task.isCompleted ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.title}
        </h2>

        {/* Description */}
        <p
          className={`line-clamp-3 text-sm leading-6 ${
            task.isCompleted ? "text-slate-400 line-through" : "text-slate-500"
          }`}
        >
          {task.description}
        </p>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FiCalendar />

          <span>
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "Today"}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onEdit(task)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-blue-600 py-2 font-medium text-blue-600 transition hover:bg-blue-50"
          >
            <FiEdit2 />
            Edit
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2 font-medium text-white transition hover:bg-red-600"
          >
            <FiTrash2 />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
