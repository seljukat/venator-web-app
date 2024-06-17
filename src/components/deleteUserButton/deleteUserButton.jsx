"use client";

import { deleteUser } from "@/lib/action";
import { useState } from "react";

import { handleLogout } from "@/lib/action";

import styles from "./deleteUserButton.module.css";

const DeleteUserButton = ({ user }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toDeleteCount, setToDeleteCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(1);

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleDeleteCount = () => {
    if (toDeleteCount === deletedCount - 1) {
      setToDeleteCount(toDeleteCount + 1);
      setDeletedCount(deletedCount + 1);
      setTimeout(() => {
        setShowConfirmation(false);
        handleLogout();
      }, 500);
    }
  };

  return (
    // <div className="w-2/5 h-[60vh] flex flex-col items-center justify-between bg-gray-300 p-[2%]">
    <>
      <span className="flex-grow text-right"></span>
      <form action={deleteUser} onSubmit={handleDeleteCount}>
        <input type="hidden" name="id" value={user._id} />
        {showConfirmation ? (
          // <div className="bg-[#2d2b42] w-1/4 flex items-center justify-evenly rounded-3xl border-8 border-slate-700 shadow-2xl shadow-[#2d2b42] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="backdrop-blur-md bg-[#2d2b42] bg-opacity-50 w-1/4 flex items-center justify-evenly rounded-3xl border-8 border-slate-700 shadow-2xl shadow-[#2d2b42] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="m-[10%] flex flex-col items-center justify-center gap-y-6">
              {/* <div className="flex items-center justify-between"> */}
              <p>Are you sure?</p>
              {/* </div> */}
              <div className="flex items-center justify-between gap-x-6">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="mr-4 rounded bg-blue-500 text-white hover:bg-blue-600 px-2 py-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-red-500 text-white hover:bg-red-600 px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleDeleteConfirmation}
            // className={`p-1.5 mr-5 mt-1 rounded text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            className={styles.button}
          >
            Delete My Account
          </button>
        )}
      </form>
    </>
  );
};

export default DeleteUserButton;
