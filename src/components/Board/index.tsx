import useGameStore from "@/store";
import { IPuzzleCell } from "@/utils/getBoard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cell from "../Cell";
import { GameResultModal, Modal, PauseModal } from "@/components";
import { usePersistGameData } from "@/hooks";

const Board = () => {
  const navigate = useNavigate();
  const board = useGameStore((s) => s.board);
  const result = useGameStore((s) => s.result);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const isPaused = useGameStore((s) => s.isPaused);

  usePersistGameData();

  useEffect(() => {
    if (!board) navigate("/");
  }, []);

  const handleNavigateToHome = () => navigate("/");

  const shouldShowPauseModal = isPaused && !Boolean(result);
  const shouldShowGameResultModal = isPaused && Boolean(result);

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
        isVisible={shouldShowPauseModal}
        onClose={resumeGame}
      >
        <PauseModal />
      </Modal>
      <Modal
        isVisible={shouldShowGameResultModal}
        onClose={handleNavigateToHome}
      >
        <GameResultModal />
      </Modal>
    </div>
  );
};

export default Board;
