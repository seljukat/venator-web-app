import Image from "next/image";
import styles from "./singleGame.module.css";
// import { getGame } from "@/lib/data";
import { auth } from "@/lib/auth";
import SingleGameSlider from "@/components/singleGameSlider/singleGameSlider";
import SingleGameStats from "@/components/singleGameStats/singleGameStats";
import SingleGameMoreStats from "@/components/singleGameMoreStats/singleGameMoreStats";

// import {useRouter} from "next/navigation";

import {
  getAllPlayerStats,
  getGame,
  getPlayerStats,
  getStats,
  getTeamStats,
  getUsers,
} from "@/lib/data";

import RefreshComponent from "@/components/RefreshComponent/RefreshComponent";

// import before from "@/demos/before.mp4";
// import after from "@/demos/after.mp4";

// FETCH DATA WITH AN API
const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/games/${slug}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

// export const generateMetadata = async ({ params }) => {
//   const { slug } = params;

//   const game = await getGame(slug);

//   return {
//     title: game.title,
//     description: game.desc,
//   };
// };

const SingleGamePage = async ({ params }) => {
  const { slug } = params;

  // FETCH DATA WITH AN API
  const game = await getGame(slug);
  const session = await auth();

  let users = await getUsers();
  let stats = await getStats();

  // let allTeamStats = await getTeamStats(game.id);
  // let allPlayersStats = await getAllPlayerStats(game.id);

  users = users.filter((user) => !user.isDeleted);
  stats = stats.filter((stat) => !stat.isDeleted);

  // allTeamStats = allTeamStats.filter((teamStat) => !teamStat.isDeleted);
  // allPlayersStats = allPlayersStats.filter(
  //   (playerStat) => !playerStat.isDeleted
  // );

  const user = users.find((user) => user.id === game.userId);
  const stat = stats.find((stat) => stat.gameId === game.id);

  // const firstTeamStats = allTeamStats.find((teamStat) => teamStat.id === 0);
  // const secondTeamStats = allTeamStats.find((teamStat) => teamStat.id === 1);

  // const firstTeamPlayersStats = allPlayersStats.filter(
  //   (playerStat) => playerStat.teamId === 0
  // );
  // const secondTeamPlayersStats = allPlayersStats.filter(
  //   (playerStat) => playerStat.teamId === 1
  // );

  const currentUser = users.find((user) => user.email === session.user.email);

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  let allTeamStats = await getTeamStats(game.id);
  let allPlayersStats = await getAllPlayerStats(game.id);

  allTeamStats = allTeamStats.filter((teamStat) => !teamStat.isDeleted);
  allPlayersStats = allPlayersStats.filter(
    (playerStat) => !playerStat.isDeleted
  );

  const firstTeamStats = allTeamStats.find((teamStat) => teamStat.teamId === 0);
  const secondTeamStats = allTeamStats.find(
    (teamStat) => teamStat.teamId === 1
  );

  const firstTeamPlayersStats = allPlayersStats.filter(
    (playerStat) => playerStat.teamId === 0
  );
  const secondTeamPlayersStats = allPlayersStats.filter(
    (playerStat) => playerStat.teamId === 1
  );

  // // Check if allTeamStats and allPlayersStats are defined and not null
  // const isDataReady = allTeamStats && allPlayersStats;
  // if (!isDataReady) {
  //   // Optionally, you could return a loading indicator or a different component
  //   return <div>Loading...</div>;
  // }

  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  // if (!currentUser) return null;

  // FETCH DATA WITHOUT AN API
  // const post = await getPost(slug);

  // if (isDataReady) {
  return (
    // <div className={styles.container}>
    //   {game.img && (
    //     <div className={styles.imgContainer}>
    //       <Image src={game.img} alt="" fill className={styles.img} />
    //     </div>
    //   )}
    //   <div className={styles.textContainer}>
    //     <h1 className={styles.title}>{game.title}</h1>
    //     <div className={styles.detail}>
    //       <div className={styles.detailText}>
    //         <span className={styles.detailTitle}>Published</span>
    //         <span className={styles.detailValue}>
    //           {game.createdAt.toString().slice(4, 16)}
    //         </span>
    //       </div>
    //     </div>
    //     <div className={styles.content}>
    //       {game.firstTeamName} - {game.secondTeamName}
    //     </div>
    //   </div>

    // </div>

    // <div className="flex items-center justify-between bg-yellow-300">
    // <div className="flex items-center justify-between">
    //   <SingleGameSlider beforeVideo={"beforeVideo"} afterVideo={"afterVideo"} />
    //   {/* </div> */}
    //   <SingleGameStats
    //     game={JSON.parse(JSON.stringify(game))}
    //     user={JSON.parse(JSON.stringify(user))}
    //     currentUser={JSON.parse(JSON.stringify(currentUser))}
    //     userId={currentUser.id}
    //     isAdmin={currentUser.isAdmin}
    //   />
    // </div>
    // <SingleGameMoreStats />

    <div>
      <RefreshComponent />
      <div className="flex items-center justify-between">
        <SingleGameSlider
          game={JSON.parse(JSON.stringify(game))}
          beforeVideo={"beforeVideo"}
          afterVideo={"afterVideo"}
        />
        {/* </div> */}
        <SingleGameStats
          stats={JSON.parse(JSON.stringify(stat))}
          game={JSON.parse(JSON.stringify(game))}
          user={JSON.parse(JSON.stringify(user))}
          currentUser={JSON.parse(JSON.stringify(currentUser))}
          userId={currentUser.id}
          isAdmin={currentUser.isAdmin}
          //
          // SPACE FOR ADDITIONAL STATS
          //
          allTeamStats={JSON.parse(JSON.stringify(allTeamStats))}
          allPlayersStats={JSON.parse(JSON.stringify(allPlayersStats))}
          firstTeamStats={JSON.parse(JSON.stringify(firstTeamStats))}
          secondTeamStats={JSON.parse(JSON.stringify(secondTeamStats))}
          firstTeamPlayersStats={JSON.parse(
            JSON.stringify(firstTeamPlayersStats)
          )}
          secondTeamPlayersStats={JSON.parse(
            JSON.stringify(secondTeamPlayersStats)
          )}
        />
      </div>

      <div>
        <SingleGameMoreStats
          stats={JSON.parse(JSON.stringify(stat))}
          game={JSON.parse(JSON.stringify(game))}
          //
          // SPACE FOR ADDITIONAL STATS
          //
          allTeamStats={JSON.parse(JSON.stringify(allTeamStats))}
          allPlayersStats={JSON.parse(JSON.stringify(allPlayersStats))}
          firstTeamStats={JSON.parse(JSON.stringify(firstTeamStats))}
          secondTeamStats={JSON.parse(JSON.stringify(secondTeamStats))}
          firstTeamPlayersStats={JSON.parse(
            JSON.stringify(firstTeamPlayersStats)
          )}
          secondTeamPlayersStats={JSON.parse(
            JSON.stringify(secondTeamPlayersStats)
          )}
        />
      </div>
    </div>
  );
  // }
};

export default SingleGamePage;