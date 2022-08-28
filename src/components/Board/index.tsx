import useStore from "@/store";
import { PuzzleCell } from "@/utils/getBoard";
import { useEffect } from "react";
import Cell from "../Cell";

const index = () => {
  const board = useStore((s) => s.board);
  const createBoard = useStore((s) => s.createBoard);

  useEffect(() => createBoard("easy"), []);

  if (!board) return null;
  console.log("board:", board);

  return (
    <div className="board">
      <ol className="board__cells">
        {board.map((cell: PuzzleCell) => (
          <Cell
            key={cell.key}
            cell={cell}
          />
        ))}
      </ol>
    </div>
  );
};

export default index;
