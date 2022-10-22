import localforage from "localforage";
import { IInitialState } from "@/store";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";

export type TProgressMap = Record<number, number>;

export default async function getGameProgressByDayOfYear(callback: (data: TProgressMap) => void) {
  const gameProgressByDayOfYearMap: TProgressMap = {};

  await localforage.iterate((gameState: IInitialState) => {
    if (!gameState || !gameState.dailyChallengeDayIndex) return;

    const progress =
      (100 * (SUDOKU_PUZZLE_SIZE - (gameState.remainingNumberOptions?.length ?? 0))) /
      SUDOKU_PUZZLE_SIZE;

    gameProgressByDayOfYearMap[gameState.dailyChallengeDayIndex] = progress;
  });

  return callback(gameProgressByDayOfYearMap);
}
