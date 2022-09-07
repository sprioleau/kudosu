import { IPuzzleCell, TBoard } from "@/utils/getBoard";

const getMatchingCells = (
  cellToMatch: IPuzzleCell,
  valueToMatch: number,
  board: TBoard,
  matchBy: "row" | "col" | "region",
) => {
  return Object.values(board).reduce((acc: TBoard, cell: IPuzzleCell) => {
    if (cell[matchBy] === cellToMatch[matchBy]) {
      acc[cell.key] = {
        ...cell,
        notes: cell.notes.filter((n) => n !== valueToMatch),
      };
    }

    return acc;
  }, {});
};

export default getMatchingCells;
