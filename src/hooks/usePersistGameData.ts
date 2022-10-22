import { useEffect } from "react";
import useGameStore from "@/store";
import localforage from "localforage";

export default function usePersistGameData() {
  const board = useGameStore((s) => s.board);
  const boardId = useGameStore((s) => s.boardId);

  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      async ({
        board,
        dailyChallengeDayIndex,
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
          dailyChallengeDayIndex,
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
