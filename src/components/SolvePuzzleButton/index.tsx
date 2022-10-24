import useGameStore from "@/store";

export default function SolvePuzzleButton() {
  const solvePuzzle = useGameStore((s) => s.solvePuzzle);

  return <button onClick={solvePuzzle}>Solve Puzzle</button>;
}
