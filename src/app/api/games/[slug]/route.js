import { Game } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    const game = await Game.findOne({ slug });
    return NextResponse.json(game);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch game!");
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Game.deleteOne({ slug });
    return NextResponse.json("Game deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete game!");
  }
};

// export const PUT = async (request, { params, body }) => {
//   const { slug } = params;
//   const {
//     title,
//     firstTeamName,
//     firstTeamJerseyColor,
//     secondTeamName,
//     secondTeamJerseyColor,
//     videoRecording,
//   } = body;

//   try {
//     connectToDb();

//     const updatedGame = await Game.findOneAndUpdate(
//       { slug },
//       {
//         title,
//         firstTeamName,
//         firstTeamJerseyColor,
//         secondTeamName,
//         secondTeamJerseyColor,
//         videoRecording,
//       },
//       { new: true }
//     );

//     return NextResponse.json(updatedGame);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update game!");
//   }
// };
