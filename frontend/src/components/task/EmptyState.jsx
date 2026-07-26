function EmptyState() {
  return (
    <div className="mt-20 rounded-xl bg-white p-10 text-center shadow">
      <h2 className="text-2xl font-bold">No Tasks Found</h2>

      <p className="mt-2 text-gray-500">
        Create your first task to get started.
      </p>
    </div>
  );
}

export default EmptyState;
