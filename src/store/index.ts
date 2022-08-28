import { Cell } from "@/components/Cell";
import { getBoard } from "@/utils";
import { PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

type TDifficulty = "easy" | "medium" | "hard" | "expert";

interface GlobalState {
  selectedNumber: number | undefined;
  selectedRow: number | undefined;
  selectedCol: number | undefined;
  selectedRegion: number | undefined;
  board: PuzzleCell[] | undefined;
  difficulty: TDifficulty;
  createBoard: (difficulty: TDifficulty) => void;
  selectCell: ({ row, col, value, region }: Cell) => void;
}

const useStore = create<GlobalState>((set) => ({
  selectedNumber: undefined,
  selectedRow: undefined,
  selectedCol: undefined,
  selectedRegion: undefined,
  board: undefined,
  difficulty: "easy",

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);
    set({ board: getBoard(puzzle, solution), difficulty });
  },

  selectCell: ({ row, col, value, region }) => {
    set({
      selectedNumber: value,
      selectedRow: row,
      selectedCol: col,
      selectedRegion: region,
    });
  },
}));

export default useStore;
