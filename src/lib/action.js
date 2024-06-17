"use server";

import { revalidatePath } from "next/cache";
import { Game, PlayerStats, Stats, TeamStats, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

const generateSlug = (title) => {
  const randomString = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString();
  const timestampSuffix = timestamp.substring(timestamp.length - 8);

  const slug = `${title
    ?.trim()
    .replace(/\s+/g, "-")
    .toLowerCase()}-${timestampSuffix}-${randomString}`;

  return slug;
};

export const addStats = async (gameId, slug) => {
  // const { stat1, stat2, stat3, stat4, gameId } = Object.fromEntries(formData);

  // const gameIdString = typeof gameId === 'string' ? gameId : gameId.toString();

  // const gameIdString = typeof gameId === "string";

  // console.log("IN ADD STATS CHECK " + gameIdString);

  // console.log("IN ADD STATS " + gameId);

  try {
    connectToDb();

    // console.log("IN TRY CATCH " + gameId);

    const newStats = new Stats({
      stat1: "null stat1",
      stat2: "null stat2",
      stat3: "null stat3",
      stat4: "null stat4",
      gameId: gameId,
      isDeleted: false,
    });

    // console.log("New Stats Object:", newStats);

    // console.log("IN ADD STATS GAME ID BEFORE SAVE: " + newStats.gameId);

    await newStats.save();

    // console.log("IN ADD STATS STAT 4: " + newStats.stat4);
    // console.log("IN ADD STATS GAME ID: " + newStats.gameId);

    console.log("saved to db");
    revalidatePath("/games");
    revalidatePath(`/games/${slug}`);
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addTeamStats = async (id, gameId, slug) => {
  // const { stat1, stat2, stat3, stat4, gameId } = Object.fromEntries(formData);

  // const gameIdString = typeof gameId === 'string' ? gameId : gameId.toString();

  // const gameIdString = typeof gameId === "string";

  // console.log("IN ADD STATS CHECK " + gameIdString);

  // console.log("IN ADD STATS " + gameId);

  try {
    connectToDb();

    // console.log("IN TRY CATCH " + gameId);

    const newStats = new TeamStats({
      teamId: id,
      distanceCoverage: 0.4,
      ballPossession: 0.4,
      gameId: gameId,
      isDeleted: false,
    });

    // console.log("New Stats Object:", newStats);

    // console.log("IN ADD STATS GAME ID BEFORE SAVE: " + newStats.gameId);

    await newStats.save();

    // console.log("IN ADD STATS STAT 4: " + newStats.stat4);
    // console.log("IN ADD STATS GAME ID: " + newStats.gameId);

    console.log("saved to db");
    revalidatePath("/games");
    revalidatePath(`/games/${slug}`);
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addPlayerStats = async (id, teamId, gameId, slug) => {
  // const { stat1, stat2, stat3, stat4, gameId } = Object.fromEntries(formData);

  // const gameIdString = typeof gameId === 'string' ? gameId : gameId.toString();

  // const gameIdString = typeof gameId === "string";

  // console.log("IN ADD STATS CHECK " + gameIdString);

  // console.log("IN ADD STATS " + gameId);

  try {
    connectToDb();

    // console.log("IN TRY CATCH " + gameId);

    const newStats = new PlayerStats({
      playerId: id,
      teamId: teamId,
      distanceCoverage: 0.4,
      gameId: gameId,
      isDeleted: false,
    });

    // console.log("New Stats Object:", newStats);

    // console.log("IN ADD STATS GAME ID BEFORE SAVE: " + newStats.gameId);

    await newStats.save();

    // console.log("IN ADD STATS STAT 4: " + newStats.stat4);
    // console.log("IN ADD STATS GAME ID: " + newStats.gameId);

    console.log("saved to db");
    revalidatePath("/games");
    revalidatePath(`/games/${slug}`);
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

// export const updateStats = async (formData, slug) => {
//   const { id, ...updateData } = Object.fromEntries(formData);

//   console.log(formData);

//   try {
//     connectToDb();

//     const updatedStats = await Stats.findByIdAndUpdate(id, updateData, {
//       new: true,
//     });

//     if (!updatedStats) {
//       return { error: "Stats not found" };
//     }

//     console.log(updatedStats);

//     console.log("updated in db");

//     revalidatePath("/games");
//     revalidatePath(`/games/${slug}`);
//     revalidatePath("/admin");
//     revalidatePath("/account");

//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

export const addGame = async (prevState, formData) => {
  const {
    title,
    firstTeamName,
    firstTeamJerseyColor,
    secondTeamName,
    secondTeamJerseyColor,
    videoRecording,
    userId,
  } = Object.fromEntries(formData);

  const slug = generateSlug(title);

  try {
    connectToDb();
    const newGame = new Game({
      title,
      firstTeamName,
      firstTeamJerseyColor,
      secondTeamName,
      secondTeamJerseyColor,
      videoRecording,
      slug,
      userId,
      isAnalyzed: false,
      isDeleted: false,
    });

    await newGame.save();
    console.log("saved to db");

    // const gameId = newGame._id.toString();
    const gameId = newGame.id;

    await addStats(gameId, slug);

    await addTeamStats(0, gameId, slug);
    await addTeamStats(1, gameId, slug);

    await addPlayerStats(-1, 0, gameId, slug);
    await addPlayerStats(-1, 1, gameId, slug);

    // revalidatePath("/games");
    // revalidatePath("/admin");
    // revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteGame = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    // await Game.findByIdAndDelete(id);
    await Game.findByIdAndUpdate(id, { isDeleted: true });
    console.log("deleted from db");
    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteAllGames = async () => {
  try {
    connectToDb();

    await Game.updateMany({}, { isDeleted: true });
    console.log("All games flagged as deleted");

    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUserGames = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    // await Game.deleteMany({ userId: id });
    await Game.updateMany({ userId: id }, { isDeleted: true });
    // await User.findByIdAndDelete(id);
    // await User.findByIdAndUpdate(id, { isDeleted: true });
    console.log("user games flagged as deleted");
    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const updateGame = async (formData) => {
  const { id, ...updateData } = Object.fromEntries(formData);
  // const updateFields = {}; // Object to store fields to be updated

  console.log(formData);

  // // Iterate over formData to extract fields to be updated
  // Object.entries(formData).forEach(([key, value]) => {
  //   // Exclude id field from updateFields
  //   if (key !== "id" && value !== "") {
  //     updateFields[key] = value;
  //   }
  // });

  // console.log(updateFields);

  try {
    connectToDb();

    const updatedGame = await Game.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedGame) {
      return { error: "Game not found" };
    }

    console.log(updatedGame);

    console.log("updated in db");

    revalidatePath("/games");
    revalidatePath(`/games/${updatedGame.slug}`);
    revalidatePath("/admin");
    revalidatePath("/account");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, isAdmin } = Object.fromEntries(formData);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    connectToDb();
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
      isDeleted: false,
    });

    await newUser.save();
    console.log("saved to db");
    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    // await Game.deleteMany({ userId: id });
    await Game.updateMany({ userId: id }, { isDeleted: true });
    // await User.findByIdAndDelete(id);
    await User.findByIdAndUpdate(id, { isDeleted: true });
    console.log("deleted from db");
    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteAllUsers = async () => {
  try {
    connectToDb();

    await Game.updateMany({}, { isDeleted: true });
    await User.updateMany({}, { isDeleted: true });
    console.log("All users flagged as deleted");

    revalidatePath("/games");
    revalidatePath("/admin");
    revalidatePath("/account");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  "use server";
  await signIn("github");
};

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isDeleted: false,
    });

    await newUser.save();
    console.log("saved to db");

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
