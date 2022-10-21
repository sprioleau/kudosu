import "@/styles/styles.scss";
import {
  Welcome,
  Game,
  DailyChallenges,
  Statistics,
  OptionsMenu,
  HowToPlay,
  AboutGame,
  SettingsMenu,
} from "@/components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useGameStore, { EGameResult } from "@/store";
import { showConfetti } from "@/utils";
import { useActionOnBlur } from "./hooks";
import { useEffect } from "react";
import { EAction } from "./components/ActionToolbar";

function App() {
  const result = useGameStore((s) => s.result);
  const pauseGame = useGameStore((s) => s.pauseGame);
  const selectCell = useGameStore((s) => s.selectCell);
  const selectedCell = useGameStore((s) => s.selectedCell);
  const board = useGameStore((s) => s.board);
  const isPaused = useGameStore((s) => s.isPaused);
  const selectAction = useGameStore((s) => s.selectAction);

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
      if (!board || selectedCell || isPaused) return;
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

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

  return (
    <div
      className="app"
      data-is-mobile={isMobile}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Welcome />}
          />
          <Route
            path="/game"
            element={<Game />}
          />
          <Route
            path="/daily-challenges"
            element={<DailyChallenges />}
          />
          <Route
            path="/statistics"
            element={<Statistics />}
          />
          <Route path="options">
            <Route
              index
              element={<OptionsMenu />}
            />
            <Route
              path="settings"
              element={<SettingsMenu />}
            />
            <Route
              path="how-to-play"
              element={<HowToPlay />}
            />
            <Route
              path="about-game"
              element={<AboutGame />}
            />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
