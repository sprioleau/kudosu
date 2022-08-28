import { SUDOKU_PUZZLE_SIZE } from "@/constants";
import { getBoardRegion } from "@/utils";

export interface PuzzleCell {
  key: number;
  row: number;
  col: number;
  region: number;
  isGiven: boolean;
  isCorrect?: boolean;
  value: number | null;
  correctValue: number;
}

export type Board = Record<string, PuzzleCell>;

export default function getBoard(puzzleString: string, solutionsString: string): Board {
  const puzzleArray: (number | null)[] = puzzleString.split("").map((s) => {
    return s === "-" ? null : Number(s);
  });
  const solutionsArray: number[] = solutionsString.split("").map((s) => Number(s));

  const cells: Board = {};
  let count = 0;

  for (let row = 0; row < SUDOKU_PUZZLE_SIZE; row++) {
    for (let col = 0; col < SUDOKU_PUZZLE_SIZE; col++) {
      const initialValue = puzzleArray[count];
      const correctValue = solutionsArray[count];

      cells[count + 1] = {
        key: count + 1,
        row: row + 1,
        col: col + 1,
        region: getBoardRegion(count + 1),
        isGiven: initialValue !== null,
        value: initialValue,
        correctValue,
      };

      count++;
    }
  }

  return cells;
}
