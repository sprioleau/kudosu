import "@/styles/styles.scss";
import { ActionToolbar, Board, GameInfo, GameResult, NumberSelect } from "@/components";

function App() {
  return (
    <div className="app">
      <h1>Kudosu</h1>
      <GameInfo />
      <Board />
      <ActionToolbar />
      <NumberSelect />
      <GameResult />
    </div>
  );
}

export default App;
