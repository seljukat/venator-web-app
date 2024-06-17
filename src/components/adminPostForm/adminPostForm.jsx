"use client";

import { addGame } from "@/lib/action";
import styles from "./adminPostForm.module.css";
import { useFormState } from "react-dom";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";

const AdminPostForm = ({ userId }) => {
  const [state, formAction] = useFormState(addGame, undefined);

  const [videoPath, setVideoPath] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setVideoPath(file.path);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Game</h1>
      <input type="hidden" name="userId" value={userId} />
      <input type="text" name="title" placeholder="Title of the Game" />
      <input type="text" name="firstTeamName" placeholder="First Team's Name" />
      <input
        type="text"
        name="firstTeamJerseyColor"
        placeholder="First Team's Jersey Color"
      />
      <input
        type="text"
        name="secondTeamName"
        placeholder="Second Team's Name"
      />
      <input
        type="text"
        name="secondTeamJerseyColor"
        placeholder="Second Team's Jersey Color"
      />
      <div>
        <div>
          <div
            className={`${styles.addBorder} w-52 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none`}
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
      {/* <input type="text" name="slug" placeholder="slug" />
      <input type="text" name="img" placeholder="img" />
      <textarea type="text" name="desc" placeholder="desc" rows={10} /> */}
      <button>Add</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
