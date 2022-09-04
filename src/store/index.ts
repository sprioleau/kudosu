import { Action, ACTION_IDS } from "@/components/ActionToolbar";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";
import { getBoard, checkGameIsWon, getRemainingOptions } from "@/utils";
import { Board, PuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";

export type TDifficulty = "easy" | "medium" | "hard" | "expert";

export type TRemainingOptions = number[];

export type Direction = "Up" | "Down" | "Left" | "Right";

type NumberTuple = [number, number];

interface InitialState {
  selectedCell: PuzzleCell | undefined;
  board: Board | undefined;
  difficulty: TDifficulty;
  mistakes: NumberTuple;
  result: string | undefined;
  remainingNumberOptions: TRemainingOptions | undefined;
  notesModeActive: boolean;
  hintsRemaining: number;
  previousMoves: PuzzleCell[];
}

const RESULT = {
  WIN: "Win",
  LOSE: "Lose",
};

const MISTAKES_ALLOWED = 3;
const HINTS_ALLOWED = 3;

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
  remainingNumberOptions: undefined,
  notesModeActive: false,
  hintsRemaining: HINTS_ALLOWED,
  previousMoves: [],
};

const useStore = create<GlobalState>((set) => ({
  ...initalState,

  createBoard: (difficulty) => {
    const { puzzle, solution } = getSudoku(difficulty);
    const board = getBoard(puzzle, solution);

    const remainingNumberOptions = getRemainingOptions(board);

    set({
      board,
      difficulty,
      remainingNumberOptions,
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

      if (s.notesModeActive) {
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
          notes: [],
          value,
        };
      }

      const newBoard: Board = {
        ...s.board,
        [newCell.key]: newCell,
      };

      const remainingNumberOptions = getRemainingOptions(newBoard);

      let newMistakes: NumberTuple = [mistakes, totalMistakes];
      let newResult = checkGameIsWon(newBoard) ? RESULT.WIN : s.result;

      if (!s.notesModeActive && newCell.value !== currentCell.correctValue) {
        newMistakes[0] = Math.min(mistakes + 1, totalMistakes);
        if (newMistakes[0] === totalMistakes) newResult = RESULT.LOSE;
      }

      const newPreviousMoves = [currentCell, ...s.previousMoves];

      return {
        board: newBoard,
        result: newResult,
        mistakes: newMistakes,
        remainingNumberOptions,
        selectedCell: newCell,
        previousMoves: newPreviousMoves,
      };
    });
  },

  resetGame: () => {
    set((s) => {
      const { puzzle, solution } = getSudoku(s.difficulty);
      const board = getBoard(puzzle, solution);
      const remainingNumberOptions = getRemainingOptions(board);

      return {
        ...initalState,
        board,
        remainingNumberOptions,
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
        if (!s.selectedCell || !s.board) return s;
        if (s.previousMoves.length === 0) return s;

        const [previousMove, ...remainingMoves] = s.previousMoves;
        const cellValueFromLastMove = previousMove;

        const newBoard = {
          ...s.board,
          [cellValueFromLastMove.key]: cellValueFromLastMove,
        };

        return {
          board: newBoard,
          selectedCell: cellValueFromLastMove,
          previousMoves: remainingMoves,
        };
      }

      if (actionId === ACTION_IDS.ERASE) {
        if (!s.selectedCell || !s.board) return s;
        if (s.selectedCell.isGiven) return s;

        const currentCell = s.board[s.selectedCell.key];

        const newCell = {
          ...currentCell,
          value: null,
        };

        const newPreviousMoves = [currentCell, ...s.previousMoves];

        const newBoard = {
          ...s.board,
          [s.selectedCell.key]: newCell,
        };

        return {
          board: newBoard,
          previousMoves: newPreviousMoves,
        };
      }

      if (actionId === ACTION_IDS.NOTES) {
        return { notesModeActive: !s.notesModeActive };
      }

      if (actionId === ACTION_IDS.HINT) {
        if (!s.selectedCell || !s.board) return s;
        if (s.hintsRemaining === 0) return s;

        const currentCell = s.board[s.selectedCell.key];

        if (currentCell.value === currentCell.correctValue) return s;

        const newCell = {
          ...currentCell,
          value: currentCell.correctValue,
          isCorrect: true,
          notes: [],
        };

        const newPreviousMoves = [currentCell, ...s.previousMoves];

        const newBoard = {
          ...s.board,
          [s.selectedCell.key]: newCell,
        };

        return {
          board: newBoard,
          selectedCell: newCell,
          hintsRemaining: s.hintsRemaining - 1,
          previousMoves: newPreviousMoves,
        };
      }

      return s;
    });
  },
}));

export default useStore;
