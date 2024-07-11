import React from "react";

const TagsComponent = () => {
  return (
    <div>
      <div className="col-span-3 bg-white p-4 rounded shadow min-w-[240px] ">
        <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-700 hover:underline px-2 py-1 rounded-md active:bg-gray-200"
            >
              #JavaScript
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-700 hover:underline px-2 py-1 rounded-md active:bg-gray-200"
            >
              #React
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-700 hover:underline px-2 py-1 rounded-md active:bg-gray-200"
            >
              #NextJS
            </a>
          </li>
          <li className="mb-2">
            <a
              href="#"
              className="text-gray-700 hover:underline px-2 py-1 rounded-md active:bg-gray-200"
            >
              #TailwindCSS
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TagsComponent;
