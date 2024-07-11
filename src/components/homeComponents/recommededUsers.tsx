import React from "react";
import { FaUser } from "react-icons/fa";

const RecommededUsers = () => {
  return (
      <div className="col-span-3 bg-white p-4 rounded shadow min-w-[360px] max-xlg:hidden">
        <h2 className="text-xl font-semibold mb-4">Recommended Users</h2>
        <ul>
          <li className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <a href="#" className="text-gray-700 font-bold hover:underline">
              User 1
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <a href="#" className="text-gray-700 font-bold hover:underline">
              User 2
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <a href="#" className="text-gray-700 font-bold hover:underline">
              User 3
            </a>
          </li>
          <li className="flex items-center mb-2">
            <FaUser className="text-gray-500 mr-2" />
            <a href="#" className="text-gray-700 font-bold hover:underline">
              User 4
            </a>
          </li>
        </ul>
      </div>
  );
};

export default RecommededUsers;
