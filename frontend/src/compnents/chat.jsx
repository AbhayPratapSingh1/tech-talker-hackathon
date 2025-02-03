import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import App from "./Hello";


const ChatColumn = () => {
  return (
    <div className="max-w-xs mx-auto bg-blue-400 h-screen p-4 rounded-lg shadow-lg">
      <div className="relative mb-6">
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 border rounded-md "
          placeholder="Search..."
        />
        <FaSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          aria-hidden="true" // Added for better accessibility
        />
      </div>
    </div>
  );
};

export default ChatColumn;
