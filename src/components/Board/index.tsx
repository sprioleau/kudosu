import useStore from "@/store";
import { useEffect } from "react";
import Cell from "../Cell";

const index = () => {
  const board = useStore((s) => s.board);
  const createBoard = useStore((s) => s.createBoard);

  useEffect(() => createBoard("easy"), []);

  if (!board) return null;

  return (
    <div className="board">
      <ol className="board__cells">
        {board.map(({ key, initialValue, row, col, region, correctValue }) => (
          <Cell
            key={key}
            row={row}
            col={col}
            region={region}
            value={initialValue ?? undefined}
          />
        ))}
      </ol>
    </div>
  );
};

export default index;
