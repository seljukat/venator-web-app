import { Game } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectToDb();

    const games = await Game.find();
    return NextResponse.json(games);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch games!");
  }
};
