import "@/styles/styles.scss";
import {
  ActionToolbar,
  Board,
  GameResult,
  Header,
  InstructionsModal,
  Modal,
  NumberSelect,
  PauseModal,
} from "@/components";
import { EGameResult } from "./store";
import useStore from "@/store";
import { showConfetti } from "@/utils";
import { useActionOnBlur } from "./hooks";
import { useEffect } from "react";

function App() {
  const result = useStore((s) => s.result);
  const updateModalContent = useStore((s) => s.updateModalContent);
  const pauseGame = useStore((s) => s.pauseGame);
  const selectCell = useStore((s) => s.selectCell);
  const selectedCell = useStore((s) => s.selectedCell);
  const board = useStore((s) => s.board);

  if (result === EGameResult.Win) {
    showConfetti();
    updateModalContent(<GameResult />);
  }

  useActionOnBlur({
    onBlur: () => pauseGame({ modalOverlay: <PauseModal /> }),
  });

  useEffect(() => {
    if (!localStorage.getItem("hasSeenInstructions")) {
      localStorage.setItem("hasSeenInstructions", JSON.stringify(true));
      if (!import.meta.env.DEV) updateModalContent(<InstructionsModal />);
    }
  }, []);

  useEffect(() => {
    const handleSelectFirstCell = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!board || selectedCell) return;
      selectCell(board["1"]);
    };

    window.addEventListener("keydown", handleSelectFirstCell);
    return () => window.removeEventListener("keydown", handleSelectFirstCell);
  }, [board, selectedCell, selectCell]);

  return (
    <div className="app">
      <Header />
      <Board />
      <ActionToolbar />
      <NumberSelect />
      <Modal />
    </div>
  );
}

export default App;
