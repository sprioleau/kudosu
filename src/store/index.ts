import { Action, ACTION_IDS } from "@/components/ActionToolbar";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";
import { getBoard, checkGameIsWon, getRemainingOptions } from "@/utils";
import { Board, PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

export type TDifficulty = "easy" | "medium" | "hard" | "expert";

export type TRemainingOptions = Record<string, number>;

export type Direction = "Up" | "Down" | "Left" | "Right";

type NumberTuple = [number, number];

interface InitialState {
  selectedCell: PuzzleCell | undefined;
  board: Board | undefined;
  difficulty: TDifficulty;
  mistakes: NumberTuple;
  result: string | undefined;
  remainingOptions: TRemainingOptions | undefined;
  notesVisible: boolean;
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
  resetGame: () => void;
  navigateToNextCell: (direction: Direction) => void;
  selectAction: (action: Action) => void;
}

const initalState: InitialState = {
  selectedCell: undefined,
  board: undefined,
  difficulty: "easy",
  mistakes: [0, MISTAKES_ALLOWED],
  result: undefined,
  remainingOptions: undefined,
  notesVisible: false,
};

const useStore = create<GlobalState>((set) => ({
  ...initalState,

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);
    const board = getBoard(puzzle, solution);

    const remainingOptions = getRemainingOptions(board);

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
      const currentCell = s.board[s.selectedCell.key];
      const [mistakes, totalMistakes] = s.mistakes;

      if (currentCell.isGiven) return s;

      let newCell = undefined;

      if (s.notesVisible) {
        newCell = {
          ...currentCell,
          notes: currentCell.notes.includes(value)
            ? currentCell.notes.filter((v) => v !== value)
            : [...currentCell.notes, value],
        };
      } else {
        newCell = {
          ...currentCell,
          isCorrect: value === currentCell.correctValue,
          value,
        };
      }

      const newBoard: Board = {
        ...s.board,
        [newCell.key]: newCell,
      };

      const remainingOptions = getRemainingOptions(newBoard);

      let newMistakes: NumberTuple = [mistakes, totalMistakes];
      let newResult = checkGameIsWon(newBoard) ? RESULT.WIN : s.result;

      if (!s.notesVisible && newCell.value !== currentCell.correctValue) {
        newMistakes[0] = Math.min(mistakes + 1, totalMistakes);
        if (newMistakes[0] === totalMistakes) newResult = RESULT.LOSE;
      }

      return {
        board: newBoard,
        result: newResult,
        mistakes: newMistakes,
        remainingOptions,
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

  navigateToNextCell: (direction) => {
    set((s) => {
      if (!s.selectedCell || !s.board) return s;

      const key = s.selectedCell.key;

      let nextCellInDirection = undefined;
      if (direction === "Up") nextCellInDirection = s.board[key - SUDOKU_PUZZLE_SIZE];
      if (direction === "Down") nextCellInDirection = s.board[key + SUDOKU_PUZZLE_SIZE];
      if (direction === "Left") nextCellInDirection = s.board[key - 1];
      if (direction === "Right") nextCellInDirection = s.board[key + 1];

      const newSelectedCell = nextCellInDirection ?? s.selectedCell;

      return { selectedCell: newSelectedCell };
    });
  },

  selectAction: (action) => {
    set((s) => {
      const actionId = action.id;

      if (actionId === ACTION_IDS.UNDO) {
        // TODO: Implement logic
        // Update object values "key", "fromValue", "toValue"
        return s;
      }

      if (actionId === ACTION_IDS.ERASE) {
        if (!s.selectedCell || !s.board) return s;
        if (s.selectedCell.isGiven) return s;

        s.board[s.selectedCell.key].value = null;

        const newBoard = {
          ...s.board,
          [s.selectedCell.key]: {
            ...s.board[s.selectedCell.key],
            value: null,
          },
        };

        return { board: newBoard };
      }

      if (actionId === ACTION_IDS.NOTES) {
        return { notesVisible: !s.notesVisible };
      }

      if (actionId === ACTION_IDS.HINT) {
        // TODO: Implement logic
        return s;
      }

      return { ...s, selectedAction: action };
    });
  },
}));

export default useStore;
