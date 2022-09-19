import "@/styles/styles.scss";
import { ActionToolbar, Board, GameResult, Header, Modal, NumberSelect } from "@/components";
import { EGameResult } from "./store";
import useStore from "@/store";
import { showConfetti } from "@/utils";

function App() {
  const result = useStore((s) => s.result);
  const updateModalContent = useStore((s) => s.updateModalContent);

  if (result === EGameResult.Win) {
    showConfetti();
    updateModalContent(<GameResult />);
  }

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
