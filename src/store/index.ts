import { getBoard } from "@/utils";
import { Board, PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

export type TDifficulty = "easy" | "medium" | "hard" | "expert";

interface InitialState {
  selectedCell: PuzzleCell | undefined;
  board: Board | undefined;
  difficulty: TDifficulty;
  mistakes: [number, number];
  result: string | undefined;
}

const RESULT = {
  WIN: "Win",
  LOSE: "Lose",
};

const MISTAKES_ALLOWED = 3;

interface GlobalState extends InitialState {
  createBoard: (difficulty: TDifficulty) => void;
  selectCell: (cell: PuzzleCell) => void;
  selectNumberOption: (value: number) => void;
  incrementMistakes: () => void;
  resetGame: () => void;
}

const initalState: InitialState = {
  selectedCell: undefined,
  board: undefined,
  difficulty: "easy",
  mistakes: [0, MISTAKES_ALLOWED],
  result: undefined,
};

const useStore = create<GlobalState>((set) => ({
  ...initalState,

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);

    set({
      board: getBoard(puzzle, solution),
      difficulty,
    });
  },

  selectCell: (cell) => set({ selectedCell: cell }),

  selectNumberOption: (value) => {
    set((s) => {
      if (!s.board || !s.selectedCell) return s;

      if (s.selectedCell.isGiven) return s;

      const newCell: PuzzleCell = {
        ...s.selectedCell,
        isCorrect: value === s.selectedCell.correctValue,
        value,
      };

      if (newCell.value !== s.selectedCell.correctValue) {
        s.incrementMistakes();
      }

      return {
        board: {
          ...s.board,
          [newCell.key]: newCell,
        },
      };
    });
  },

  incrementMistakes: () => {
    set((s) => {
      const [mistakes, totalMistakes] = s.mistakes;

      if (mistakes + 1 === totalMistakes) {
        return {
          result: RESULT.LOSE,
        };
      }

      if (mistakes === totalMistakes) return s;

      return {
        mistakes: [mistakes + 1, totalMistakes],
      };
    });
  },

  resetGame: () => {
    set((s) => {
      const { puzzle, solution } = getSudoku(s.difficulty);

      return {
        ...initalState,
        board: getBoard(puzzle, solution),
      };
    });
  },
}));

export default useStore;
