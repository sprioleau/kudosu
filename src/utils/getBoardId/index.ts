import { getSudoku } from "sudoku-gen";

export default function getBoardId({ puzzle, solution, difficulty }: ReturnType<typeof getSudoku>) {
  const difficulties = ['easy', 'medium', 'hard', 'expert'];
  return `${difficulties.indexOf(difficulty)}${puzzle.replace(/-/g, "0")}${solution}`;
};