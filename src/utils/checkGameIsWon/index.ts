import { Board, PuzzleCell } from "../getBoard";

const checkGameIsWon = (board: Board): boolean => {
  return Object.values(board).every(({ correctValue, value }: PuzzleCell) => {
    return value === correctValue;
  });
};

export default checkGameIsWon;
