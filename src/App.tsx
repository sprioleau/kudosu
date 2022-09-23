import "@/styles/styles.scss";
import {
  ActionToolbar,
  Board,
  GameResult,
  Header,
  Modal,
  NumberSelect,
  PauseModal,
} from "@/components";
import { EGameResult } from "./store";
import useStore from "@/store";
import { showConfetti } from "@/utils";
import { useActionOnBlur } from "./hooks";

function App() {
  const result = useStore((s) => s.result);
  const updateModalContent = useStore((s) => s.updateModalContent);
  const pauseGame = useStore((s) => s.pauseGame);
  const resumeGame = useStore((s) => s.resumeGame);

  if (result === EGameResult.Win) {
    showConfetti();
    updateModalContent(<GameResult />);
  }

  useActionOnBlur({
    onBlur: () => pauseGame({ modalOverlay: <PauseModal /> }),
    onFocus: resumeGame,
  });

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
