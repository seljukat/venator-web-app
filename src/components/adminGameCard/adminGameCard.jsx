"use client";

import Image from "next/image";
import styles from "./adminGameCard.module.css";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { deleteGame } from "@/lib/action";
import { useState } from "react";

const AdminGameCard = ({ game, user, currentUser }) => {
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

  const isCurrentUserUploader = currentUser && currentUser._id === user._id;

  return (
    <div className={styles.post}>
      {!showConfirmation && (
        <>
          <div className={styles.detail}>
            <span className="truncate max-w-40">{game.title}</span>
          </div>
          {/* Display owner's name */}
          <span className="flex-grow"></span>
          <span
            className={`rounded-full pr-4 pl-4 ${
              isCurrentUserUploader
                ? "bg-green-300 text-[#2d2b42] font-black"
                : user.isAdmin
                ? "bg-yellow-300 text-[#2d2b42] font-black"
                : "bg-[#2d2b42] text-[#9ca3af] font-black"
            }`}
          >
            uploader: {isCurrentUserUploader ? "you" : user.username}
          </span>
          {/* <span className="flex-grow text-right"> */}
          <span>
            <Link
              className={styles.link}
              href={`/games/${game.slug}`}
              // target="_blank"
            >
              {">>"} STATS
            </Link>
          </span>

          {/* <span className={styles.detail}>
            <span className={styles.postTitle}>{game.title}</span>
            <span className="flex-grow text-right">
              <Link
                className={styles.link}
                href={`/games/${game.slug}`}
                target="_blank"
              >
                {">>"} STATS
              </Link>
            </span>
          </span> */}
        </>
      )}
      <form action={deleteGame} onSubmit={handleDeleteCount}>
        <input type="hidden" name="id" value={game._id} />
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

export default AdminGameCard;
