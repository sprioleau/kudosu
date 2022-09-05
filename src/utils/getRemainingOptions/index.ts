import { TRemainingOptions } from "@/store";
import { TBoard, IPuzzleCell } from "../getBoard";

const getRemainingOptions = (board: TBoard): TRemainingOptions => {
  const result = Object.values(board).reduce(
    (acc: Record<string, number>, { value }: IPuzzleCell) => {
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
