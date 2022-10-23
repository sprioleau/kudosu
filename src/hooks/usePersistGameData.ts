import { useEffect } from "react";
import useGameStore, { IInitialState } from "@/store";
import localforage from "localforage";

export type TExsistingGameState = Pick<
  IInitialState,
  | "board"
  | "dailyChallengeData"
  | "difficulty"
  | "mistakes"
  | "result"
  | "remainingNumberOptions"
  | "hintsRemaining"
  | "elapsedTimeSeconds"
>;

export default function usePersistGameData() {
  const board = useGameStore((s) => s.board);
  const boardId = useGameStore((s) => s.boardId);

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      async ({
        board,
        dailyChallengeData,
        difficulty,
        mistakes,
        result,
        remainingNumberOptions,
        hintsRemaining,
        elapsedTimeSeconds,
      }) => {
        if (!boardId) return;

        await localforage.setItem(boardId, {
          board,
          dailyChallengeData,
          difficulty,
          mistakes,
          result,
          remainingNumberOptions,
          hintsRemaining,
          elapsedTimeSeconds,
        });
      },
    );

    return () => unsubscribe();
  }, [board]);
}
