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

  if (result === EGameResult.Win) {
    showConfetti();
    updateModalContent(<GameResult />);
  }

  useActionOnBlur({
    onBlur: () => pauseGame({ modalOverlay: <PauseModal /> }),
  });

  useEffect(() => {
    if (localStorage.getItem("hasSeenInstructions")) return;
    updateModalContent(<InstructionsModal />);
  }, []);

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
