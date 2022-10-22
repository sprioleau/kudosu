import { STORAGE_KEYS } from "@/constants";
import localforage from "localforage";

export default function ClearPersistedStateButton() {
  if (process.env.NODE_ENV !== "development") return null;

  const handleClearPersistedState = async () => {
    localStorage.removeItem(STORAGE_KEYS.LOCAL_STORAGE.CURRENT_GAME_STATE);
    await localforage.clear();
    window.location.pathname = "/";
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "2em",
        left: "50%",
        transform: "translateX(-50%)",
      }}
      onClick={handleClearPersistedState}
    >
      Clear Persisted State
    </button>
  );
}
