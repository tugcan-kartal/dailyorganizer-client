import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

const Profile: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);

  const logoutAccount = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="relative inline-block p-2">
      {/* Profile Icon */}
      <div
        className="text-2xl p-2 md:mr-5 cursor-pointer"
        onClick={() => setShowDetail(!showDetail)}
      >
        <FaRegUser />
      </div>

      {/* Dropdown Menu */}
      {showDetail && (
        <div className="absolute md:w-[5vw] right-0 mt-2 bg-white border rounded-lg shadow-lg z-10">
          <div
            onClick={logoutAccount}
            className="px-4 py-2 text-black cursor-pointer hover:bg-gray-100"
          >
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
