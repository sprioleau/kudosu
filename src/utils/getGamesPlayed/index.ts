import localforage from "localforage";
import { HINTS_ALLOWED, IInitialState } from "@/store";

export default async function getGamesPlayed() {
  let totalGames = 0;
  let gamesWon = 0;
  let winsWithNoMistakes = 0;
  let winsWithNoHints = 0;
  let bestTimeInSeconds: number | undefined = undefined;
  let totalTimeInGamesWonSeconds = 0;

  await localforage.iterate((gameState: IInitialState) => {
    if (!gameState || !gameState.board) return;
    const gameIsWon = gameState.result === "Win";
    const time = gameState.elapsedTimeSeconds;

    if (gameIsWon) {
      if (gameState.mistakes[0] === 0) winsWithNoMistakes++;
      if (gameState.hintsRemaining === HINTS_ALLOWED) winsWithNoHints++;
      if (!bestTimeInSeconds || time < bestTimeInSeconds) bestTimeInSeconds = time;

      gamesWon++;
      totalTimeInGamesWonSeconds += time;
    }

    totalGames++;
  });

  return {
    totalGames,
    gamesWon,
    winRate: totalGames > 0 ? Math.round(gamesWon / totalGames) * 100 : undefined,
    winsWithNoMistakes,
    winsWithNoHints,
    bestTimeInSeconds,
    averageTimeInSeconds:
      gamesWon > 0 ? Math.round(totalTimeInGamesWonSeconds / gamesWon) : undefined,
  };
}
