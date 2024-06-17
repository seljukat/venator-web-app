import { getGames, getUsers } from "@/lib/data";
import styles from "./adminPosts.module.css";
import AdminGameCard from "@/components/adminGameCard/adminGameCard";
import { auth } from "@/lib/auth";
import DeleteAllGamesButton from "../deleteAllGamesButton/deleteAllGamesButton";

const AdminPosts = async () => {
  let games = await getGames();
  let users = await getUsers();
  const session = await auth();

  games = games.filter((game) => !game.isDeleted);
  users = users.filter((user) => !user.isDeleted);

  const currentUser = users.find((user) => user.email === session.user.email);

  const gameUserPairs = games.map((game) => {
    // Find the user corresponding to the game's owner ID
    const user = users.find((user) => user.id === game.userId);
    return { game, user };
  });

  return (
    // <div className={styles.container}>
    <div className={styles.mainContainer}>
      <div className="flex items-center justify-between gap-2 w-full">
        <h1>
          Games {"("} {games.length} {")"}
        </h1>
        {games.length > 0 && <DeleteAllGamesButton />}
      </div>
      {gameUserPairs.map(({ game, user }) => (
        <div key={game.slug} className={styles.post}>
          <AdminGameCard
            game={JSON.parse(JSON.stringify(game))}
            user={JSON.parse(JSON.stringify(user))}
            currentUser={JSON.parse(JSON.stringify(currentUser))}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
