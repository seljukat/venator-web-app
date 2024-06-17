import { Game, PlayerStats, Stats, TeamStats, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getGames = async () => {
  try {
    connectToDb();
    const games = await Game.find();
    return games;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch games!");
  }
};

export const getGame = async (slug) => {
  try {
    connectToDb();
    const game = await Game.findOne({ slug });
    return game;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch game!");
  }
};

export const getUser = async (id) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const getStats = async () => {
  try {
    connectToDb();
    const stats = await Stats.find();
    return stats;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stats!");
  }
};

export const getStat = async (id) => {
  try {
    connectToDb();
    const stat = await Stats.findById(id);
    return stat;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stat!");
  }
};

export const getTeamStats = async (gameId) => {
  try {
    connectToDb();
    const teamStats = await TeamStats.find({ gameId });
    return teamStats;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch team stats!");
  }
};

export const getTeamStat = async (teamId, gameId) => {
  try {
    connectToDb();
    const teamStat = await TeamStats.findOne({
      teamId: teamId,
      gameId: gameId,
    });
    return teamStat;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stat!");
  }
};

export const getAllPlayerStats = async (gameId) => {
  try {
    connectToDb();
    const playerStats = await PlayerStats.find({
      gameId: gameId,
    });
    return playerStats;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stats!");
  }
};

export const getTeamPlayerStats = async (teamId, gameId) => {
  try {
    connectToDb();
    const playerStats = await PlayerStats.find({
      teamId: teamId,
      gameId: gameId,
    });
    return playerStats;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stats!");
  }
};

export const getPlayerStat = async (id, teamId, gameId) => {
  try {
    connectToDb();
    const playerStat = await PlayerStats.findOne({
      playerId: id,
      teamId: teamId,
      gameId: gameId,
    });
    return playerStat;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch stat!");
  }
};
