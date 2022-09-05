import useStore from "@/store";
import { IPuzzleCell } from "@/utils/getBoard";
import { useEffect } from "react";
import Cell from "../Cell";

const Board = () => {
  const board = useStore((s) => s.board);
  const createBoard = useStore((s) => s.createBoard);

  useEffect(() => createBoard("easy"), []);

  if (!board) return null;

  return (
    <div className="board">
      <ol className="board__cells">
        {Object.values(board).map((cell: IPuzzleCell) => (
          <Cell
            key={cell.key}
            cell={cell}
          />
        ))}
      </ol>
      <ul className="board__grid">
        <li className="board__grid-line horizontal"></li>
        <li className="board__grid-line horizontal"></li>
        <li className="board__grid-line vertical"></li>
        <li className="board__grid-line vertical"></li>
      </ul>
    </div>
  );
};

export default Board;
