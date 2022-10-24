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
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayOfYear from "dayjs/plugin/dayOfYear";
import duration from "dayjs/plugin/duration";
import { isMobileDevice, STORAGE_KEYS } from "@/constants";
import localforage from "localforage";

dayjs.extend(advancedFormat);
dayjs.extend(dayOfYear);
dayjs.extend(duration);

localforage.config({
  name: STORAGE_KEYS.INDEXEDDB.NAME,
  storeName: STORAGE_KEYS.INDEXEDDB.STORE_NAME,
});

function App() {
  const pauseGame = useGameStore((s) => s.pauseGame);
  const selectCell = useGameStore((s) => s.selectCell);
  const selectedCell = useGameStore((s) => s.selectedCell);
  const board = useGameStore((s) => s.board);
  const isPaused = useGameStore((s) => s.isPaused);
  const selectAction = useGameStore((s) => s.selectAction);

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

  return (
    <div
      className="app"
      data-is-mobile={isMobileDevice}
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
