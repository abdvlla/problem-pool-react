import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/pools" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-blue-600 text-white px-4 py-1 rounded-lg w-fit hover:bg-blue-800"
      >
        <BsArrowLeft className="text-2xl" />
      </Link>
    </div>
  );
};

export default BackButton;
