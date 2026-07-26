const filters = ["All", "Personal", "Work", "Study", "Project", "Important"];

function FilterButtons({ selectedFilter, setSelectedFilter }) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          className={`rounded-full px-4 py-2 transition ${
            selectedFilter === filter
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
