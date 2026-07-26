import { FiX, FiEdit3, FiPlusCircle } from "react-icons/fi";
import TaskForm from "./TaskForm";

function CreateTaskModal({ open, onClose, refreshTasks, taskToEdit }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {/* Close modal when clicking outside */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/20 p-2">
              {taskToEdit ? <FiEdit3 size={22} /> : <FiPlusCircle size={22} />}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {taskToEdit ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="text-sm text-blue-100">
                {taskToEdit
                  ? "Update your existing task."
                  : "Add a new task to your workspace."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-white/20"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          <TaskForm
            taskToEdit={taskToEdit}
            onClose={onClose}
            refreshTasks={refreshTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateTaskModal;
