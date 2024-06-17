"use client";

import Image from "next/image";
import styles from "./adminUserCard.module.css";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { deleteUser } from "@/lib/action";
import { useState } from "react";

const AdminUserCard = ({ user, currentUser }) => {
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
      }, 500);
    }
  };

  const isCurrentUser = currentUser && currentUser._id === user._id;

  return (
    <div className={styles.post}>
      {!showConfirmation && (
        <>
          <div className={styles.detail}>
            <span className="truncate max-w-40">{user.username}</span>
          </div>
          {user.isAdmin && (
            <span
              className={`flex-grow text-right pl-4 pr-4 rounded-full ${
                isCurrentUser ? "bg-green-300" : "bg-yellow-300"
              } text-[#2d2b42] font-black`}
            >
              {isCurrentUser ? "you" : "admin"}
            </span>
          )}
        </>
      )}
      <form action={deleteUser} onSubmit={handleDeleteCount}>
        <input type="hidden" name="id" value={user._id} />
        {showConfirmation ? (
          <>
            <div className="flex items-center justify-between bg-[var(--bg)]">
              <p className="mr-8">Are you sure?</p>
              <button
                type="button"
                onClick={handleCancelDelete}
                className="mr-4 rounded bg-blue-500 text-white hover:bg-blue-600 px-2 py-1"
              >
                Cancel
              </button>
              <button type="submit" className={styles.postButton}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleDeleteConfirmation}
            className={styles.postButton}
          >
            Delete
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminUserCard;
