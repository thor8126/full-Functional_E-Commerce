import React from "react";

const DeletePrompt = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation bg-white p-4 border border-gray-200 rounded shadow-lg">
      <p className="text-gray-700">
        Are you sure you want to delete this product?
      </p>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded m-1"
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded m-1"
        onClick={onCancel}
      >
        No
      </button>
    </div>
  );
};

export default DeletePrompt;
