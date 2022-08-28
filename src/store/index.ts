import { getBoard } from "@/utils";
import { PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

type TDifficulty = "easy" | "medium" | "hard" | "expert";

interface GlobalState {
  selectedCell: PuzzleCell | undefined;
  board: PuzzleCell[] | undefined;
  difficulty: TDifficulty;
  createBoard: (difficulty: TDifficulty) => void;
  selectCell: (cell: PuzzleCell) => void;
}

const useStore = create<GlobalState>((set) => ({
  selectedCell: undefined,
  board: undefined,
  difficulty: "easy",

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);
    set({ board: getBoard(puzzle, solution), difficulty });
  },

  selectCell: (cell) => set({ selectedCell: cell }),
}));

export default useStore;
