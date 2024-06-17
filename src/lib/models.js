import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const gameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    firstTeamName: {
      type: String,
      required: true,
    },
    firstTeamJerseyColor: {
      type: String,
      required: true,
    },
    secondTeamName: {
      type: String,
      required: true,
    },
    secondTeamJerseyColor: {
      type: String,
      required: true,
    },
    videoRecording: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    isAnalyzed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const statsSchema = new mongoose.Schema(
  {
    stat1: {
      type: String,
      required: true,
    },
    stat2: {
      type: String,
      required: true,
    },
    stat3: {
      type: String,
      required: true,
    },
    stat4: {
      type: String,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const teamStatsSchema = new mongoose.Schema(
  {
    teamId: {
      type: Number,
      required: true,
    },
    distanceCoverage: {
      type: Number,
      required: true,
    },
    ballPossession: {
      type: Number,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const playerStatsSchema = new mongoose.Schema(
  {
    playerId: {
      type: Number,
      required: true,
    },
    teamId: {
      type: Number,
      required: true,
    },
    distanceCoverage: {
      type: Number,
      required: true,
    },
    gameId: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Game = mongoose.models?.Game || mongoose.model("Game", gameSchema);
export const Stats =
  mongoose.models?.Stats || mongoose.model("Stats", statsSchema);
export const TeamStats =
  mongoose.models?.TeamStats || mongoose.model("TeamStats", teamStatsSchema);
export const PlayerStats =
  mongoose.models?.PlayerStats ||
  mongoose.model("PlayerStats", playerStatsSchema);
