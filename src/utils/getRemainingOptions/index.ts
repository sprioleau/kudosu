import { TRemainingOptions } from "@/store";
import { Board, PuzzleCell } from "../getBoard";

const getRemainingOptions = (board: Board): TRemainingOptions => {
  return Object.values(board).reduce((acc: TRemainingOptions, { value }: PuzzleCell) => {
    if (!value) return acc;

    if (!acc[value]) {
      acc[value] = 1;
    } else {
      acc[value]++;
    }

    return acc;
  }, {});
};

export default getRemainingOptions;
