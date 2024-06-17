"use client";

import Image from "next/image";
import styles from "./gameCard.module.css";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { deleteGame } from "@/lib/action";
import { useState } from "react";

const GameCard = ({ game, user, userId, isAdmin }) => {
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

  const isDeletable = isAdmin || userId === game.userId;
  const isAdminDeletingOthersGame = isAdmin && userId !== game.userId;

  return (
    <li className="px-3 py-3 flex items-center justify-between m-10">
      <form action={deleteGame} onSubmit={handleDeleteCount}>
        <input type="hidden" name="id" value={game._id} />
        {showConfirmation ? (
          <>
            <div className="flex items-center justify-between">
              <p className="mr-8">Are you sure?</p>
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
          </>
        ) : (
          <button
            type="button"
            onClick={handleDeleteConfirmation}
            className={`p-1.5 mr-5 mt-1 rounded text-white ${
              isAdminDeletingOthersGame
                ? !user.isAdmin
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
                : isDeletable
                ? "bg-red-500 hover:bg-red-700"
                : "bg-gray-500 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            disabled={!isDeletable}
          >
            {" "}
            <BiTrash />
          </button>
        )}
      </form>
      {!showConfirmation && (
        <div className="flex-grow">
          <div className="flex items-center">
            <span className="flex-none font-medium text-2xl text-blue-500">
              <p className="truncate max-w-40"> {game.title}</p>
            </span>
            <span className="flex-grow text-right">
              <Link className={styles.link} href={`/games/${game.slug}`}>
                {">>"} STATS
              </Link>
            </span>
          </div>
        </div>
      )}
    </li>
  );
};

export default GameCard;
