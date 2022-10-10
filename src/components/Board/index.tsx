import useStore from "@/store";
import { IPuzzleCell } from "@/utils/getBoard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cell from "../Cell";
import { Modal, PauseModal } from "@/components";

const Board = () => {
  const navigate = useNavigate();
  const board = useStore((s) => s.board);
  const resumeGame = useStore((s) => s.resumeGame);
  const isPaused = useStore((s) => s.isPaused);

  useEffect(() => {
    if (!board || !localStorage.getItem("gameState")) {
      navigate("/");
    }
  }, []);

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
      <Modal
        isVisible={isPaused}
        onClose={resumeGame}
      >
        <PauseModal />
      </Modal>
    </div>
  );
};

export default Board;
