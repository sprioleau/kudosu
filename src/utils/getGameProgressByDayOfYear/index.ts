import localforage from "localforage";
import { IInitialState } from "@/store";
import { MINIMUM_PROGRESS_PERCENTAGE, SUDOKU_PUZZLE_SIZE } from "@/constants";

export type TProgressMap = Record<number, number>;

export default async function getGameProgressByDayOfYear(callback: (data: TProgressMap) => void) {
  const gameProgressByDayOfYearMap: TProgressMap = {};

  await localforage.iterate((gameState: IInitialState) => {
    if (!gameState || !gameState.dailyChallengeData?.dayOfYear) return;

    const { dailyChallengeData, elapsedTimeSeconds, remainingNumberOptions, result } = gameState;

    const numbersSolved = SUDOKU_PUZZLE_SIZE - (remainingNumberOptions?.length ?? 0);
    const percentComplete = (100 * numbersSolved) / SUDOKU_PUZZLE_SIZE;

    const progress =
      percentComplete > 0 || (!result && elapsedTimeSeconds > 0)
        ? Math.max(percentComplete, MINIMUM_PROGRESS_PERCENTAGE)
        : 0;

    gameProgressByDayOfYearMap[dailyChallengeData.dayOfYear] = progress;
  });

  return callback(gameProgressByDayOfYearMap);
}
