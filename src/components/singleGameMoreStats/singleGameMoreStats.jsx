"use client";

import Image from "next/image";
import Link from "next/link";
import { BiPencil, BiTrash } from "react-icons/bi";
import { FcExpand, FcCollapse } from "react-icons/fc";
import {
  TbLayoutNavbarExpand,
  TbLayoutNavbarExpandFilled,
} from "react-icons/tb";
import {
  TbLayoutNavbarCollapse,
  TbLayoutNavbarCollapseFilled,
} from "react-icons/tb";

import { deleteGame, updateGame } from "@/lib/action";
import { useState, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import "./singleGameMoreStats.css";

import field from "./field_lines.png";

// import h337 from "heatmap.js";

import Data from "./data.json";

// const SingleGameMoreStats = ({
//   gameStats,
//   game,
//   user,
//   currentUser,
//   userId,
//   isAdmin,
// }) => {
const SingleGameMoreStats = ({
  stats,
  game,
  allTeamStats,
  allPlayersStats,
  firstTeamStats,
  secondTeamStats,
  firstTeamPlayersStats,
  secondTeamPlayersStats,
}) => {
  const [showMoreStats, setShowMoreStats] = useState(false);

  const toggleMoreStats = () => {
    setShowMoreStats(!showMoreStats);

    // Scroll the page down 100vh when the accordion is opened
    setTimeout(() => {
      if (!showMoreStats) {
        window.scrollTo({
          top: window.scrollY + window.innerHeight * 0.7,
          behavior: "smooth",
        });
      }
    }, 10);
  };

  const [showTeam, setShowTeam] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [selectedStat, setSelectedStat] = useState("");

  // const heatmapContainer = useRef(null);
  // const heatmapInstance = useRef(null);

  const handleShowTeam = () => {
    setShowPlayer(false);
    setShowTeam(true);
    setSelectedStat("");
  };

  const handleShowPlayer = () => {
    setShowTeam(false);
    setShowPlayer(true);
    setSelectedStat("");
  };

  const handleSelectTeam = (e) => {
    setSelectedTeam(e.target.value);
  };
  const handleSelectPlayer = (e) => {
    setSelectedPlayer(e.target.value);
  };
  const handleSelectStat = (statOwnerType, statOwner, statName) => {
    // let selectedStat = null;
    // let selectedStat =
    //   "[   " + statOwnerType + " " + statOwner + " " + statName + "   ]";

    let selectedStat = null;

    if (statName === "avg-position" || statName === "heat-map") {
      // selectedStat = `path/${statOwnerType}/${statOwner}/${statName}`;
      // selectedStat = (
      //   <Image
      //     src={`/images/image58_293.jpg`}
      //     width={400}
      //     height={600}
      //     alt={statName}
      //   />
      // );

      // console.log(game.slug);
      

      selectedStat = (
        <Image
          src={`/${game.slug}/images/${statOwnerType}_${statOwner}_${statName}.jpg`}
          width={600}
          height={900}
          alt={statName}
          style={statName === "heat-map" ? { transform: "scaleY(-1)" } : {}}
        />
      );
      // selectedStat = "path";
    } else {
      if (statName === "ball-possession") {
        selectedStat = `${allTeamStats[statOwner].ballPossession}%`;
      } else if (statName === "distance-coverage") {
        if (statOwnerType === "team") {
          selectedStat = `${allTeamStats[statOwner].distanceCoverage}m`;
        } else if (statOwnerType === "player") {
          selectedStat = `${allPlayersStats[statOwner].distanceCoverage}m`;
        }
      }
    }

    // if (statName === "heat-map") {
    //   const playerId = parseInt(statOwner);

    //   console.log("playerId: " + playerId); // Extract the id from statOwner

    //   const playerData = Data.player_stat.find(
    //     (player) => player.id === playerId
    //   );

    //   console.log("playerData: " + playerData.pos); // Extract the id from statOwner
    //   console.log("len: ", playerData.pos.length);

    //   if (playerData) {
    //     let dataPoints = [];

    //     // for start

    //     for (let i = 0; i < playerData.pos.length; i++) {
    //       let dataPoint = {
    //         x: playerData.pos[i][0],
    //         y: playerData.pos[i][1],
    //         value: 1,
    //       };

    //       console.log("x: " + playerData.pos[i][0]);
    //       console.log("y: " + playerData.pos[i][1]);

    //       dataPoints.push(dataPoint);
    //     }

    //     // console.log("pts: " + dataPoints[0].x);

    //     // for end

    //     var heatmapData = {
    //       max: 100,
    //       min: 0,
    //       data: dataPoints,
    //     };
    //     // heatmapInstance.setData(heatmapData);

    //     console.log("heatmapData: " + heatmapData.data);

    //     if (heatmapInstance.current) {
    //       heatmapInstance.current.setData(heatmapData);
    //     }
    //   }
    // }

    // if (statOwnerType === "team" && stat[statOwner]) {
    //   selectedStat = stat[statOwner][statName];
    // } else if (statOwnerType === "player" && stat[statOwner]) {
    //   selectedStat = stat[statOwner][statName];
    // }

    setSelectedStat(selectedStat);
  };

  // useEffect(() => {
  //   if (!heatmapInstance.current && heatmapContainer.current) {
  //     heatmapInstance.current = h337.create({
  //       container: heatmapContainer.current,
  //       // radius: 10,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!document.getElementById("heatmapContainer")) {
  //     var heatmapInstance = h337.create({
  //       container: document.getElementById("heatmapContainer"),
  //       radius: 10,
  //       maxOpacity: 0.5,
  //       minOpacity: 0,
  //       blur: 0.75,
  //     });

  //     var points = [];
  //     var max = 0;
  //     var width = 600;
  //     var height = 400;
  //     var len = 200;

  //     while (len--) {
  //       var val = Math.floor(Math.random() * 1000);
  //       max = Math.max(max, val);
  //       var point = {
  //         x: Math.floor(Math.random() * width),
  //         y: Math.floor(Math.random() * height),
  //         value: val,
  //       };
  //       points.push(point);
  //     }
  //     // heatmap data format
  //     var data = {
  //       max: max,
  //       min: 0,
  //       data: points,
  //     };

  //     heatmapInstance.setData(data);
  //   }
  // }, []);

  return (
    <div className="accordion">
      <div className="flex items-center justify-center">
        {game.isAnalyzed && (
          <div
            onClick={toggleMoreStats}
            // className={`cursor-pointer flex items-center justify-center text-5xl text-[var(--bgSoft)] ${
            //   showMoreStats ? "flip" : "flip-back"
            // }`}
            className="cursor-pointer flex items-center justify-center text-5xl text-[var(--bgSoft)] mb-[-10%] z-[990]"
            // className={`cursor-pointer flex items-center justify-center text-5xl text-[var(--bgSoft)] ${
            //   showMoreStats ? "" : "animate-bounce"
            // }`}
            // style={{ transform: "scale(2)" }}
          >
            {showMoreStats ? (
              // <TbLayoutNavbarCollapseFilled />
              <TbLayoutNavbarExpandFilled style={{ transform: "scaleY(-1)" }} />
            ) : (
              // <FcCollapse />
              <TbLayoutNavbarExpandFilled />
              // <FcExpand />
            )}
          </div>
        )}
      </div>
      {/* {showMoreStats && ( */}
      <div
        className={`mt-[10%] mb-[-10%] moreStats ${
          showMoreStats ? "open" : ""
        }`}
      >
        <div
          className={`flex flex-col items-center gap-y-16 moreStatsActual ${
            showMoreStats ? "openMoreStats" : ""
          }`}
        >
          <div className="w-full flex items-center justify-between">
            <div>
              View Statistics for a
              <button
                type="button"
                className={
                  "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                }
                onClick={handleShowTeam}
                // className={`p-1.5 mr-5 mt-1 rounded text-white ${
                //   isAdminDeletingOthersGame
                //     ? !user.isAdmin
                //       ? "bg-gray-500 hover:bg-gray-600"
                //       : "bg-yellow-500 hover:bg-yellow-600"
                //     : isDeletable
                //     ? "bg-red-500 hover:bg-red-700"
                //     : "bg-gray-500 cursor-not-allowed"
                // } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                // disabled={!isDeletable}
              >
                Team
              </button>
              <button
                type="button"
                className={
                  "rounded-full pr-2 pl-2 mr-2 ml-2 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                }
                onClick={handleShowPlayer}
              >
                Player
              </button>
            </div>
            {showTeam && selectedTeam && (
              <div>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("team", selectedTeam, "avg-position")
                  }
                >
                  Avg Position
                </button>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("team", selectedTeam, "ball-possession")
                  }
                >
                  Ball Possession
                </button>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("team", selectedTeam, "distance-coverage")
                  }
                >
                  Distance Coverage
                </button>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("team", selectedTeam, "heat-map")
                  }
                >
                  Heat-map
                </button>
              </div>
            )}
            {showPlayer && selectedPlayer && (
              <div>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("player", selectedPlayer, "avg-position")
                  }
                >
                  Avg Position
                </button>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat(
                      "player",
                      selectedPlayer,
                      "distance-coverage"
                    )
                  }
                >
                  Distance Coverage
                </button>
                <button
                  type="button"
                  className={
                    "rounded-full pr-2 pl-2 mr-2 ml-4 bg-[#2d2b42] text-[#9ca3af] font-black active:bg-transparent"
                  }
                  onClick={() =>
                    handleSelectStat("player", selectedPlayer, "heat-map")
                  }
                >
                  Heat-map
                </button>
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-between">
            {showTeam && (
              <div>
                Select Team:
                <select
                  className="ml-2 bg-[#2d2b42] text-[#9ca3af]"
                  value={selectedTeam}
                  onChange={handleSelectTeam}
                >
                  <option
                    className="bg-[#2d2b42] text-[#2d2b42]"
                    value="team"
                    selected
                    hidden
                  >
                    {" "}
                  </option>
                  <option value="0">{game.firstTeamName}</option>
                  <option value="1">{game.secondTeamName}</option>
                </select>
              </div>
            )}
            {showPlayer && (
              <div>
                Select Player:
                <select
                  className="ml-2 bg-[#2d2b42] text-[#9ca3af]"
                  value={selectedPlayer}
                  onChange={handleSelectPlayer}
                >
                  <option
                    className="bg-[#2d2b42] text-[#2d2b42]"
                    value="team"
                    selected
                    hidden
                  >
                    {" "}
                  </option>
                  {/* <option value="player1">id 1</option>
                  <option value="player2">id 2</option>
                  <option value="player3">id 3</option>
                  <option value="player4">id 4</option>
                  <option value="player5">id 5</option>
                  <option value="player6">id 6</option>
                  <option value="player7">id 7</option>
                  <option value="player8">id 8</option>
                  <option value="player9">id 9</option>
                  <option value="player10">id 10</option>
                  <option value="player11">id 11</option>
                  <option value="player12">id 12</option>
                  <option value="playernull">id .</option>
                  <option value="playernull">id .</option>
                  <option value="playernull">id .</option> */}
                  {/* {Data.player_stat.map((player) => (
                    <option key={player.id} value={player.id}>
                      id {player.id}
                    </option>
                  ))} */}
                  {allPlayersStats
                    .filter((player) => player.playerId !== -1)
                    .map((player) => (
                      <option key={player.playerId} value={player.playerId}>
                        id {player.playerId}
                      </option>
                    ))}

                  {/* {stats.players.map((player, index) => (
                    <option key={index} value={player.id}>
                      {player.name}
                    </option>
                  ))} */}
                </select>
              </div>
            )}
            {selectedStat && (
              <div>
                {/* {selectedStat} */}

                {/* <div
                  ref={heatmapContainer}
                  style={{
                    position: "relative",
                    width: "400px",
                    height: "600px",
                    zIndex: "300",
                  }}
                > */}
                {/* <Image
                  // ref={heatmapContainer}
                  // id="heatmapContainer"
                  src={field}
                  width={400}
                  height={600}
                  alt="field lines"
                /> */}
                {/* </div> */}

                {/* <canvas>
                  displayed stat
                  {selectedStat}
                </canvas> */}

                {selectedStat}
              </div>
            )}
          </div>
          {/* <div>
            GAME: |||
            {game.title}
            |||
            {game.videoRecording}
            |||
            {game.userId}
            |||
            {game.isAnalyzed}
            |||
            {stats.isDeleted}
          </div>
          <div>
            STAT: |||
            {stats.stat1}
            |||
            {stats.stat2}
            |||
            {stats.stat3}
            |||
            {stats.stat4}
            |||
            {stats.gameId}
            |||
            {stats.isDeleted}
          </div>

          <div>
            ALL TEAMS: |||
            {allTeamStats[0].teamId}
            |||
            {allTeamStats[1].teamId}
          </div>

          <div>
            ALL PLAYERS: |||
            {allPlayersStats[0].playerId}
            |||
            {allPlayersStats[1].playerId}
          </div>

          <div>
            FIRST TEAM STATS: |||
            {firstTeamStats.teamId}
            |||
            {firstTeamStats.distanceCoverage}
            |||
            {firstTeamStats.ballPossession}
            |||
            {firstTeamStats.avgPosition}
            |||
            {firstTeamStats.heatMap}
            |||
            {firstTeamStats.gameId}
            |||
            {firstTeamStats.isDeleted}
          </div>

          <div>
            SECOND TEAM STATS: |||
            {secondTeamStats.teamId}
            |||
            {secondTeamStats.distanceCoverage}
            |||
            {secondTeamStats.ballPossession}
            |||
            {secondTeamStats.avgPosition}
            |||
            {secondTeamStats.heatMap}
            |||
            {secondTeamStats.gameId}
            |||
            {secondTeamStats.isDeleted}
          </div>

          <div>
            FIRST TEAM PLAYERS STATS: |||
            {firstTeamPlayersStats[0].playerId}
            |||
            {firstTeamPlayersStats[1].playerId}
          </div>

          <div>
            SECOND TEAM PLAYERS STATS: |||
            {secondTeamPlayersStats[0].playerId}
            |||
            {secondTeamPlayersStats[1].playerId}
            |||
            {secondTeamPlayersStats[2].teamId}
            |||
            {secondTeamPlayersStats[3].distanceCoverage}
            |||
            {secondTeamPlayersStats[0].avgPosition}
            |||
            {secondTeamPlayersStats[1].heatMap}
            |||
            {secondTeamPlayersStats[2].gameId}
            |||
            {secondTeamPlayersStats[3].isDeleted}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleGameMoreStats;
