import "@/styles/styles.scss";
import { Board, NumberSelect } from "@/components";

function App() {
  return (
    <div className="app">
      <h1>Kudosu</h1>
      <Board />
      <NumberSelect />
    </div>
  );
}

export default App;
