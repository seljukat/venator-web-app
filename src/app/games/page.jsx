import GameCard from "@/components/gameCard/gameCard";
import styles from "./games.module.css";
import GameAddForm from "@/components/gameAddForm/gameAddForm";
import ScrollToTopButton from "@/components/scrollToTopButton/scrollToTopButton";
import { auth } from "@/lib/auth";
import { getGames, getUsers } from "@/lib/data";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/games", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
};

const GamesPage = async () => {
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
    <div>
      <GameAddForm userId={currentUser.id} />

      <div className={styles.container}>
        {gameUserPairs.map(({ game, user }) => (
          <div className={styles.post} key={game.slug}>
            <GameCard
              game={JSON.parse(JSON.stringify(game))}
              user={JSON.parse(JSON.stringify(user))}
              userId={currentUser.id}
              isAdmin={currentUser.isAdmin}
              className={styles.card}
            />
          </div>
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default GamesPage;
