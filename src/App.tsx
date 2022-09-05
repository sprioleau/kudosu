import "@/styles/styles.scss";
import { ActionToolbar, Board, GameResult, Header, NumberSelect } from "@/components";

function App() {
  return (
    <div className="app">
      <Header />
      <Board />
      <ActionToolbar />
      <NumberSelect />
      <GameResult />
    </div>
  );
}

export default App;
