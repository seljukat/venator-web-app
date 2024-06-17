"use client";

import { GiSoccerField } from "react-icons/gi";
import { useState, useCallback } from "react";
import { addGame } from "@/lib/action";
import { useFormState } from "react-dom";
import Image from "next/image";
import styles from "./gameAddForm.module.css";

import { useDropzone } from "react-dropzone";

// function getDate() {
//   const today = new Date();
//   const month = today.getMonth() + 1;
//   const year = today.getFullYear();
//   const day = today.getDate();
//   const hour = today.getHours();
//   const minute = today.getMinutes();
//   return `${year}-${month}-${day} ${hour}:${minute}`;
// }

const GameAddForm = ({ userId }) => {
  const [state, formAction] = useFormState(addGame, undefined);
  const [toggleForm, setToggleForm] = useState(false);

  const [videoPath, setVideoPath] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoPath(file.path);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    // <form action={formAction} className={styles.container}>
    <form
      action={formAction}
      //   className="flex items-center justify-center flex-col"
      className={styles.container}
    >
      {/* <div className="flex items-center justify-center"> */}
      {/* <div> */}
      {/* <div className="w-20 p-2 border-b border-secondary"></div> */}
      <button
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
        className={`text-white text-2xl font-semibold px-2 py-3 w-1/4 mb-10 text-center rounded-xl flex items-center justify-center
        ${toggleForm ? "rounded-t-md" : "rounded-md"}`}
      >
        <div className="px-12 py-6 border border-b-0 text-xl">Add New Game</div>
      </button>
      {/* <div className="w-20 p-2 border-b border-secondary"></div> */}
      {/* </div> */}
      {toggleForm && (
        <div className="flex items-center justify-center w-1/2 mb-10">
          {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> */}
          <div className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
            <input type="hidden" name="userId" value={userId} />
          </div>
          <div className="flex items-center justify-center flex-col w-full border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
            <div className="block text-sm font-medium text-white sm:mt-px sm:pt-2">
              <input
                type="text"
                name="title"
                placeholder="Title of the Game"
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center justify-evenly flex-col">
                {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> */}
                <div className="block text-sm font-medium text-white sm:mt-px sm:pt-2">
                  <input
                    type="text"
                    name="firstTeamName"
                    placeholder="First Team's Name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> */}
                <div className="block text-sm font-medium text-white sm:mt-px sm:pt-2">
                  <input
                    type="text"
                    name="firstTeamJerseyColor"
                    placeholder="First Team's Jersey Color"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* {state?.error} */}
              </div>

              <div className="flex items-center justify-center flex-col">
                {/* <h1>VS</h1> */}
                <Image src="/versus.png" alt="" width={100} height={100} />
              </div>

              <div className="flex items-center justify-evenly flex-col">
                {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> */}
                <div className="block text-sm font-medium text-white sm:mt-px sm:pt-2">
                  <input
                    type="text"
                    name="secondTeamName"
                    placeholder="Second Team's Name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> */}
                <div className="block text-sm font-medium text-white sm:mt-px sm:pt-2">
                  <input
                    type="text"
                    name="secondTeamJerseyColor"
                    placeholder="Second Team's Jersey Color"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <div
                  className={`${styles.addBorder} mt-4 mb-4 w-60 ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none`}
                  //   className=""
                  //   className="p-6 border"
                  // onClick={(event) => {
                  //   setToggleForm(!toggleForm);
                  //   // clear form data
                  //   Array.from(event.target.form.elements).forEach((element) => {
                  //     if (element.type === "checkbox") {
                  //       element.checked = false;
                  //     } else {
                  //       element.value = "";
                  //     }
                  //   });
                  // }}
                >
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p>Video Recording</p>
                  </div>
                  <input
                    type="hidden"
                    name="videoRecording"
                    value={videoPath}
                    // className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            {videoPath && <p>Selected video: {videoPath}</p>}
            <div>
              <div className="flex items-center justify-center">
                <button
                  className={`${styles.addBorder} mt-4 w-20 ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none`}
                  //   className=""
                  //   className="p-6 border"
                  // onClick={(event) => {
                  //   setToggleForm(!toggleForm);
                  //   // clear form data
                  //   Array.from(event.target.form.elements).forEach((element) => {
                  //     if (element.type === "checkbox") {
                  //       element.checked = false;
                  //     } else {
                  //       element.value = "";
                  //     }
                  //   });
                  // }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* <div className="pt-5">
            <div className="flex justify-end"> */}
        </div>
      )}
    </form>
  );
};

export default GameAddForm;

{
  /* <form action={formAction} className={styles.container}>
      <h1>Add New Game</h1>
      <input type="hidden" name="userId" value={userId} /> */
}
//   <input type="text" name="title" placeholder="Title" />
//   <input type="text" name="slug" placeholder="slug" />
//   <input type="text" name="img" placeholder="img" />
//   <textarea type="text" name="desc" placeholder="desc" rows={10} />
//   <button>Add</button>
//   {state?.error}
// </form>

{
  /* <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="gameRecordName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Name of the Record
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="gameRecordName"
                id="gameRecordName"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    gameRecordName: event.target.value,
                  });
                }}
                value={formData.gameRecordName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="firstTeamName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Team 1 Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="firstTeamName"
                id="firstTeamName"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    firstTeamName: event.target.value,
                  });
                }}
                value={formData.firstTeamName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="firstTeamJerseyColor"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-2 dark:text-white"
            >
              Jersey Color
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="color"
                name="firstTeamJerseyColor"
                id="firstTeamJerseyColor"
                placeholder="#2563eb"
                title="Choose your color"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    firstTeamJerseyColor: event.target.value,
                  });
                }}
                value={formData.firstTeamJerseyColor}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-1 h-10 cursor-pointer isabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="secondTeamName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Team 2 Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="secondTeamName"
                id="secondTeamName"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    secondTeamName: event.target.value,
                  });
                }}
                value={formData.secondTeamName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="secondTeamJerseyColor"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 mb-2 dark:text-white"
            >
              Jersey Color
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="color"
                name="secondTeamJerseyColor"
                id="secondTeamJerseyColor"
                placeholder="#2563eb"
                title="Choose your color"
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    secondTeamJerseyColor: event.target.value,
                  });
                }}
                value={formData.secondTeamJerseyColor}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md p-1 h-10 cursor-pointer isabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="videoRecording"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Video Recording of the Game
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">DRAG AND DROP</div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={formDataPublish}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div> */
}
