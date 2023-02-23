import { isMobileDevice, STORAGE_KEYS } from "@/constants";
import useGameStore from "@/store";
import localforage from "localforage";

export default function ClearPersistedStateButton() {
  if (process.env.NODE_ENV !== "development" || isMobileDevice) return null;

  const resetGame = useGameStore((s) => s.resetGame);

  const handleClearPersistedState = async () => {
    await localforage.clear();
    localStorage.removeItem(STORAGE_KEYS.LOCAL_STORAGE.CURRENT_GAME_STATE);
    resetGame();
    window.location.pathname = "/";
  };

  return <button onClick={handleClearPersistedState}>Clear Persisted State</button>;
}
