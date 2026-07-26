import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getTasks, deleteTask, toggleTaskStatus } from "../api/taskApi.js";

import DashboardLayout from "../components/layout/DashboardLayout";
import TaskList from "../components/task/TaskList";
import Loading from "../components/task/Loading";
import EmptyState from "../components/task/EmptyState";
import FloatingButton from "../components/task/FloatingButton";
import CreateTaskModal from "../components/task/CreateTaskModal";
import SearchBar from "../components/task/SearchBar";
import FilterButtons from "../components/task/FilterButtons";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await getTasks();

      setTasks(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search + Filter
  const filteredTasks = tasks.filter((task) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(search) ||
      task.description.toLowerCase().includes(search);

    const matchesFilter =
      selectedFilter === "All" || task.type === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  // Create
  const handleCreateTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  // Edit
  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  // Delete
  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  // Toggle Status
  const handleToggleTask = async (taskId) => {
    try {
      await toggleTaskStatus(taskId);
      toast.success("Task status updated!");
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update task status",
      );
    }
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  };

  return (
    <DashboardLayout>
      {/* Centered Content */}
      <div className="mx-auto w-full max-w-5xl">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterButtons
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />

        {loading ? (
          <Loading />
        ) : filteredTasks.length === 0 ? (
          <EmptyState
            title={tasks.length === 0 ? "No Tasks Yet" : "No Matching Tasks"}
            description={
              tasks.length === 0
                ? "Create your first task to get started."
                : "Try changing your search or filter."
            }
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}
      </div>

      <FloatingButton onClick={handleCreateTask} />

      <CreateTaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        refreshTasks={fetchTasks}
        taskToEdit={taskToEdit}
      />
    </DashboardLayout>
  );
}

export default Dashboard;
