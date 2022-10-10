import "@/styles/styles.scss";
import {
  ActionToolbar,
  Board,
  GameInfo,
  Header,
  NumberSelect,
  PauseModal,
  Welcome,
} from "@/components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useStore, { EGameResult } from "@/store";
import { showConfetti } from "@/utils";
import { useActionOnBlur } from "./hooks";
import { useEffect } from "react";
import { EAction } from "./components/ActionToolbar";

function App() {
  const result = useStore((s) => s.result);
  const pauseGame = useStore((s) => s.pauseGame);
  const selectCell = useStore((s) => s.selectCell);
  const selectedCell = useStore((s) => s.selectedCell);
  const board = useStore((s) => s.board);
  const selectAction = useStore((s) => s.selectAction);

  useEffect(() => {
    if (!result) return;
    if (result === EGameResult.Win) showConfetti();
  }, [result, showConfetti]);

  useActionOnBlur({
    onBlur: () => {
      if (window.location.pathname !== "/game") return;
      pauseGame();
    },
  });

  useEffect(() => {
    const handleSelectFirstCell = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (!board || selectedCell) return;
      selectCell(board["1"]);
    };

    window.addEventListener("keydown", handleSelectFirstCell);
    return () => window.removeEventListener("keydown", handleSelectFirstCell);
  }, [board, selectedCell, selectCell]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (!["u", "e", "n", "h", "p"].includes(e.key)) return;

      if (e.key === "p") pauseGame();

      let action = undefined;
      if (e.key === "u") action = EAction.Undo;
      if (e.key === "e") action = EAction.Erase;
      if (e.key === "n") action = EAction.Notes;
      if (e.key === "h") action = EAction.Hint;

      if (action) selectAction(action);
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [pauseGame, selectAction]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Welcome />
                {/* <Modal /> */}
              </>
            }
          />
          <Route
            path="/game"
            element={
              <>
                <Header />
                <GameInfo />
                <Board />
                <ActionToolbar />
                <NumberSelect />
                {/* <Modal /> */}
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
