import useStore from "@/store";
import { IPuzzleCell } from "@/utils/getBoard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cell from "../Cell";

const Board = () => {
  const board = useStore((s) => s.board);
  const navigate = useNavigate();

  useEffect(() => {
    if (!board || !localStorage.getItem("gameState")) {
      navigate("/");
    }
  })

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
