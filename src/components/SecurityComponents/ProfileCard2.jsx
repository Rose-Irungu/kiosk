import React from "react";

export default function ActionSection({ onEdit, onChangePassword }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Action</h2>

      <div className="flex gap-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          EDIT
        </button>
        <button
          onClick={onChangePassword}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          CHANGE PASSWORD
        </button>
      </div>
    </div>
  );
}
