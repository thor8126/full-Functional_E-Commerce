import React from "react";

const DeletePrompt = ({ onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation">
      <p>Are you sure you want to delete this product?</p>
      <button className="btn btn-danger px-lg-4 m-1" onClick={onConfirm}>
        Yes
      </button>
      <button className="btn btn-secondary px-lg-4 m-1" onClick={onCancel}>
        No
      </button>
    </div>
  );
};

export default DeletePrompt;
