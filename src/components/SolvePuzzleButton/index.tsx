import { isMobileDevice } from "@/constants";
import useGameStore from "@/store";

export default function SolvePuzzleButton() {
  const solvePuzzle = useGameStore((s) => s.solvePuzzle);

  if (isMobileDevice) return null;

  return <button onClick={solvePuzzle}>Solve Puzzle</button>;
}
