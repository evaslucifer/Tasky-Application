import { FiPlus } from "react-icons/fi";

function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-blue-700"
    >
      <FiPlus size={28} />
    </button>
  );
}

export default FloatingButton;
