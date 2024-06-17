"use client";

import Image from "next/image";
import Link from "next/link";
import { BiTrash, BiCollapse, BiExpand } from "react-icons/bi";
import { deleteGame } from "@/lib/action";
import { useState, useRef, useEffect } from "react";

// import before from "@/demos/before.mp4";
// import after from "@/demos/after.mp4";

import { ReactCompareSlider } from "react-compare-slider";

import SpinningBall from "../spinningBall/spinningBall";

const SingleGameSlider = ({ game, beforeVideo, afterVideo }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };
  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <>
      {game.isAnalyzed ? (
        <div
          className={`transition-all duration-500 ${
            isExpanded ? "absolute w-9/12 z-[995]" : "relative w-3/5"
          }`}
        >
          <div className="absolute bottom-5 left-5 z-[999] text-white">
            {isExpanded ? (
              <BiCollapse
                onClick={handleCollapse}
                className="cursor-pointer w-10 h-10"
                size={24}
              />
            ) : (
              <BiExpand
                onClick={handleExpand}
                className="cursor-pointer w-10 h-10"
                size={24}
              />
            )}
          </div>

          <ReactCompareSlider
            className="w-full rounded-3xl"
            itemOne={
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source
                  src={`/${process.env.BEFORE_VIDEO_PREFIX}/videos/${game.videoRecording}`}
                  // src={`/input/videos/${game.videoRecording}`}
                  type="video/mp4"
                />
              </video>
            }
            itemTwo={
              <video autoPlay loop muted className="w-full h-full object-cover">
                <source
                  src={`/${game.slug}/videos/output.mp4`}
                  type="video/mp4"
                />
              </video>
            }
          />
        </div>
      ) : (
        <div className="relative w-3/5">
          <SpinningBall />
          <div className="absolute bottom-[40%] left-[27%] text-6xl">
            ANALYZING...
          </div>
        </div>
      )}
    </>
  );
};

export default SingleGameSlider;
