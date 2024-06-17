import { getGames, getUsers } from "@/lib/data";
import styles from "./accountPosts.module.css";
import Image from "next/image";
import { deleteGame } from "@/lib/action";
import { auth } from "@/lib/auth";
import Link from "next/link";
import AccountGameCard from "@/components/accountGameCard/accountGameCard";
import DeleteUserGamesButton from "../deleteUserGamesButton/deleteUserGamesButton";

const AccountPosts = async ({ userId }) => {
  const session = await auth();
  let users = await getUsers();
  let games = await getGames();

  users = users.filter((user) => !user.isDeleted);
  games = games.filter((game) => !game.isDeleted);

  const accountGames = games.filter((game) => game.userId === userId);

  const currentUser = users.find((user) => user.email === session.user.email);

  return (
    // <div className={styles.container}>
    <div className={styles.mainContainer}>
      <div className="flex items-center justify-between gap-2 w-full">
        {/* <h1>
          Games I{"'"}ve Uploaded {"("} {accountGames.length} {"/"}{" "}
          {games.length} {")"}
        </h1> */}
        <h1>
          My Games {"("} {accountGames.length} {"/"} {games.length} {")"}
        </h1>
        {accountGames.length > 0 && (
          <DeleteUserGamesButton
            currentUser={JSON.parse(JSON.stringify(currentUser))}
          />
        )}
      </div>
      {accountGames.map((game) => (
        // <div className={styles.post} key={game.id}>
        <div key={game.slug} className={styles.post}>
          <AccountGameCard game={JSON.parse(JSON.stringify(game))} />

          {/* <div className={styles.detail}>
            <span className={styles.postTitle}>{game.title}</span>
          </div>
          <span className="flex-grow text-right">
            <Link
              className={styles.link}
              href={`/games/${game.slug}`}
              target="_blank"
            >
              {">>"} STATS
            </Link>
          </span>
          <form action={deleteGame}>
            <input type="hidden" name="id" value={game.id} />
            <button className={styles.postButton}>Delete</button>
          </form> */}
        </div>
      ))}
    </div>
  );
};

export default AccountPosts;
