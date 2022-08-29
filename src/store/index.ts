import { getBoard, checkGameIsWon, getRemainingOptions } from "@/utils";
import { Board, PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

export type TDifficulty = "easy" | "medium" | "hard" | "expert";

export type TRemainingOptions = Record<string, number>;

interface InitialState {
  selectedCell: PuzzleCell | undefined;
  board: Board | undefined;
  difficulty: TDifficulty;
  mistakes: [number, number];
  result: string | undefined;
  remainingOptions: TRemainingOptions | undefined;
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
  remainingOptions: undefined,
};

const useStore = create<GlobalState>((set) => ({
  ...initalState,

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);
    const board = getBoard(puzzle, solution);

    const remainingOptions = getRemainingOptions(board);
    console.log("remainingOptions:", remainingOptions);

    set({
      board,
      difficulty,
      remainingOptions,
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

      const newBoard: Board = {
        ...s.board,
        [newCell.key]: newCell,
      };

      const remainingOptions = getRemainingOptions(newBoard);

      if (newCell.value !== s.selectedCell.correctValue) {
        s.incrementMistakes();
      }

      const newResult = checkGameIsWon(newBoard) ? RESULT.WIN : undefined;

      return {
        board: newBoard,
        result: newResult,
        remainingOptions,
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
      const board = getBoard(puzzle, solution);
      const remainingOptions = getRemainingOptions(board);

      return {
        ...initalState,
        board,
        remainingOptions,
      };
    });
  },
}));

export default useStore;
