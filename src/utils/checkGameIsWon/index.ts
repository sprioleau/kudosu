import { TBoard, IPuzzleCell } from "../getBoard";

const checkGameIsWon = (board: TBoard): boolean => {
  return Object.values(board).every(({ correctValue, value }: IPuzzleCell) => {
    return value === correctValue;
  });
};

export default checkGameIsWon;
