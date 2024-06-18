import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 flex">
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-600 text-white px-4 py-1 rounded-lg w-fit hover:bg-blue-800 z-50"
      >
        <BsArrowLeft className="text-2xl" />
      </button>
    </div>
  );
};

export default BackButton;
