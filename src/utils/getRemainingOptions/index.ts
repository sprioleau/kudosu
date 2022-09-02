import { TRemainingOptions } from "@/store";
import { Board, PuzzleCell } from "../getBoard";

const getRemainingOptions = (board: Board): TRemainingOptions => {
  const result = Object.values(board).reduce(
    (acc: Record<string, number>, { value }: PuzzleCell) => {
      if (!value) return acc;

      if (!acc[value]) {
        acc[value] = 1;
      } else {
        acc[value]++;
      }

      return acc;
    },
    {},
  );

  return Object.entries(result)
    .filter(([_, occurrences]) => occurrences < 9)
    .map(([number]) => Number(number));
};

export default getRemainingOptions;
