import { ClearPersistedStateButton, SolvePuzzleButton } from "@/components";
import { useLocation } from "react-router-dom";

export default function DevelopmentButtons() {
  if (process.env.NODE_ENV !== "development") return null;

  const { pathname } = useLocation();

  const shouldShowSolvePuzzleButton = pathname === "/game";

  return (
    <div
      style={{
        position: "fixed",
        bottom: "2em",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "1em",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <ClearPersistedStateButton />
      {shouldShowSolvePuzzleButton && <SolvePuzzleButton />}
    </div>
  );
}
