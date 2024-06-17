"use client";

import Image from "next/image";
import Link from "next/link";
import { BiPencil, BiTrash } from "react-icons/bi";
import { deleteGame, updateGame } from "@/lib/action";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const SingleGameStats = ({
  stats,
  game,
  user,
  currentUser,
  userId,
  isAdmin,
  allTeamStats,
  allPlayersStats,
  firstTeamStats,
  secondTeamStats,
  firstTeamPlayersStats,
  secondTeamPlayersStats,
}) => {
  const [state, formAction] = useFormState(updateGame, undefined);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toDeleteCount, setToDeleteCount] = useState(0);
  const [deletedCount, setDeletedCount] = useState(1);

  const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
  const [toUpdateCount, setToUpdateCount] = useState(0);
  const [updatedCount, setUpdatedCount] = useState(1);

  const handleDeleteConfirmation = () => {
    setShowUpdateConfirmation(false);
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const router = useRouter();

  const handleDeleteCount = () => {
    if (toDeleteCount === deletedCount - 1) {
      setToDeleteCount(toDeleteCount + 1);
      setDeletedCount(deletedCount + 1);
      setTimeout(() => {
        setShowConfirmation(false);
        router.push("/games");
      }, 500);
    }
  };

  const handleUpdateConfirmation = () => {
    setShowConfirmation(false);
    setShowUpdateConfirmation(true);
  };

  const handleCancelUpdate = () => {
    setShowUpdateConfirmation(false);
  };

  const handleUpdateCount = () => {
    if (toUpdateCount === updatedCount - 1) {
      setToUpdateCount(toUpdateCount + 1);
      setUpdatedCount(updatedCount + 1);
      setTimeout(() => {
        setShowUpdateConfirmation(false);
        // router.push(`/games/${game.slug}`);
        router.refresh();
      }, 500);
    }
  };

  const isDeletable = isAdmin || userId === game.userId;
  const isAdminDeletingOthersGame = isAdmin && userId !== game.userId;

  const isCurrentUserUploader = currentUser && currentUser._id === user._id;

  return (
    // <div className="w-2/5 h-[60vh] flex flex-col items-center justify-between bg-gray-300 p-[2%]">
    <div className="w-2/5 h-[60vh] flex flex-col items-center justify-between p-[2%]">
      <div className="flex flex-col items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="text-5xl">{game.title}</div>
          <span className="flex-grow text-right"></span>
          <form action={deleteGame} onSubmit={handleDeleteCount}>
            <input type="hidden" name="id" value={game._id} />
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
          <form action={updateGame} onSubmit={handleUpdateCount}>
            <input type="hidden" name="id" value={game._id} />
            {showUpdateConfirmation ? (
              // <div className="bg-[#2d2b42] flex items-center justify-between rounded-3xl border-8 border-slate-700 shadow-2xl shadow-[#2d2b42] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="backdrop-blur-md bg-[#2d2b42] bg-opacity-50 flex items-center justify-between rounded-3xl border-8 border-slate-700 shadow-2xl shadow-[#2d2b42] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="m-[10%] flex flex-col items-center justify-center gap-y-6">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center justify-center">
                      <div className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                        <input
                          type="hidden"
                          name="userId"
                          value={currentUser._id}
                        />
                      </div>
                      <div className="flex items-center justify-center flex-col w-full border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
                        <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                          <input
                            type="text"
                            name="title"
                            defaultValue={game.title}
                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="flex items-center justify-around w-full">
                          <div className="flex items-center justify-evenly flex-col">
                            <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                              <input
                                type="text"
                                name="firstTeamName"
                                defaultValue={game.firstTeamName}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                              <input
                                type="text"
                                name="firstTeamJerseyColor"
                                defaultValue={game.firstTeamJerseyColor}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-center flex-col">
                            <Image
                              src="/versus.png"
                              alt=""
                              width={100}
                              height={100}
                            />
                          </div>

                          <div className="flex items-center justify-evenly flex-col">
                            <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                              <input
                                type="text"
                                name="secondTeamName"
                                defaultValue={game.secondTeamName}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                            <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                              <input
                                type="text"
                                name="secondTeamJerseyColor"
                                defaultValue={game.secondTeamJerseyColor}
                                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="block text-sm font-medium text-black sm:mt-px sm:pt-2">
                            <input
                              type="text"
                              name="videoRecording"
                              defaultValue={game.videoRecording}
                              className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-4/5">
                    {/* <p className="mr-8">Save Changes?</p> */}
                    <button
                      type="button"
                      onClick={handleCancelUpdate}
                      className="mr-4 rounded bg-blue-500 text-white hover:bg-blue-600 px-2 py-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded bg-red-500 text-white hover:bg-red-600 px-2 py-1"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleUpdateConfirmation}
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
                <BiPencil />
              </button>
            )}
          </form>
        </div>

        <div className="flex items-center justify-between gap-2 w-full text-2xl pl-[1%]">
          {game.firstTeamName} -vs- {game.secondTeamName}
          <span className="flex-grow text-right"></span>
        </div>
        <div className="flex items-center justify-between gap-2 w-full text-base pl-[1%]">
          uploaded by
          <span
            className={`rounded-full pr-2 pl-2 ${
              isCurrentUserUploader
                ? "bg-green-300 text-[#2d2b42] font-black"
                : user.isAdmin
                ? "bg-yellow-300 text-[#2d2b42] font-black"
                : "bg-[#2d2b42] text-[#9ca3af] font-black"
            }`}
          >
            {isCurrentUserUploader ? "you" : user.username}
          </span>
          <span className="flex-grow text-right"></span>
        </div>
      </div>
      <br />
      <div className="flex-col items-center justify-between gap-2 w-full">
        <div className="flex items-center justify-between gap-2 w-full text-2xl pl-[1%]">
          Key Stats
          <span className="flex-grow text-right"></span>
        </div>
        <br />
        {game.isAnalyzed && (
          <div className="flex items-center justify-between gap-2 w-full text-base pl-[1%]">
            Ball Possession: {firstTeamStats.ballPossession}% -vs-{" "}
            {secondTeamStats.ballPossession}%
            <br />
            Distance Coverage: {firstTeamStats.distanceCoverage}m -vs-{" "}
            {secondTeamStats.distanceCoverage}m
            <br />
            {/* Stat 3: {stats.stat3}
          <br />
          Stat 4: {stats.stat4}
          <br /> */}
            <span className="flex-grow text-right"></span>
          </div>
        )}
        {!game.isAnalyzed && (
          <div className="flex items-center justify-between gap-2 w-full text-base pl-[1%]">
            Analyzing...
            <span className="flex-grow text-right"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleGameStats;
