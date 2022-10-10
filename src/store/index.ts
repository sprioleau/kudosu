import { EAction } from "@/components/ActionToolbar";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";
import { getBoard, checkGameIsWon, getRemainingOptions, getMatchingCells } from "@/utils";
import { TBoard, IPuzzleCell } from "@/utils/getBoard";
import { getSudoku } from "sudoku-gen";
import create from "zustand";
import { persist } from 'zustand/middleware'

export enum EDifficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  expert = "expert",
}

export type TRemainingOptions = number[];

export type TDirection = "Up" | "Down" | "Left" | "Right";
export enum EGameResult {
  Win = "Win",
  Lose = "Lose",
}

type TNumberTuple = [number, number];

interface IInitialState {
  selectedCell: IPuzzleCell | undefined;
  board: TBoard | undefined;
  difficulty: EDifficulty;
  mistakes: TNumberTuple;
  result: EGameResult | undefined;
  remainingNumberOptions: TRemainingOptions | undefined;
  notesModeActive: boolean;
  hintsRemaining: number;
  previousMoves: IPuzzleCell[];
  elapsedTimeSeconds: number;
  timerResetFunction: () => void;
  isPaused: boolean;
  lastSelectedCell: IPuzzleCell | undefined;
}

const MISTAKES_ALLOWED = 3;
const HINTS_ALLOWED = 3;

interface IGlobalState extends IInitialState {
  createBoard: (difficulty: EDifficulty, callback?: () => void) => void;
  selectCell: (cell: IPuzzleCell | undefined) => void;
  selectNumberOption: (value: number) => void;
  resetGame: () => void;
  navigateToNextCell: (direction: TDirection) => void;
  selectAction: (action: EAction) => void;
  updateElapsedTimeSeconds: (elapsedTime: number) => void;
  setTimerResetFunction: (timerResetFunction: () => void) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  setElapsedTimeSeconds: (elapsedTimeSeconds: number) => void;
}

const initialState: IInitialState = {
  selectedCell: undefined,
  board: undefined,
  difficulty: EDifficulty.easy,
  mistakes: [0, MISTAKES_ALLOWED],
  result: undefined,
  remainingNumberOptions: undefined,
  notesModeActive: false,
  hintsRemaining: HINTS_ALLOWED,
  previousMoves: [],
  elapsedTimeSeconds: 0,
  timerResetFunction: () => {},
  isPaused: false,
  lastSelectedCell: undefined,
};

const useStore = create(
  persist<IGlobalState >((set) => ({
      ...initialState,

      createBoard: (difficulty, callback) => {
        const { puzzle, solution, difficulty: appliedDifficulty } = getSudoku(difficulty);
        const board = getBoard(puzzle, solution);

        const remainingNumberOptions = getRemainingOptions(board);

        set({
          board,
          difficulty: EDifficulty[appliedDifficulty],
          remainingNumberOptions,
        });

        if (callback) callback();
      },

      selectCell: (cell) => set({ selectedCell: cell }),

      selectNumberOption: (value) => {
        set((s) => {
          if (!s.board || !s.selectedCell) return s;
          if (s.selectedCell.isCorrect) return s;
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

          let cellsInMatchingRow = {};
          let cellsInMatchingCol = {};
          let cellsInMatchingRegion = {};

          if (!s.notesModeActive) {
            cellsInMatchingRow = getMatchingCells(newCell, value, s.board, "row");
            cellsInMatchingCol = getMatchingCells(newCell, value, s.board, "col");
            cellsInMatchingRegion = getMatchingCells(newCell, value, s.board, "region");
          }

          const newBoard = {
            ...s.board,
            ...cellsInMatchingRow,
            ...cellsInMatchingCol,
            ...cellsInMatchingRegion,
            [newCell.key]: newCell,
          };

          const remainingNumberOptions = getRemainingOptions(newBoard);

          let newMistakes: TNumberTuple = [mistakes, totalMistakes];
          let newResult = checkGameIsWon(newBoard) ? EGameResult.Win : s.result;
          
          if (!s.notesModeActive && newCell.value !== currentCell.correctValue) {
            newMistakes[0] = Math.min(mistakes + 1, totalMistakes);
            if (newMistakes[0] === totalMistakes) newResult = EGameResult.Lose;
          }
          
          const gameIsWon = newResult === EGameResult.Win;

          const newPreviousMoves = [currentCell, ...s.previousMoves];

          if (gameIsWon) {
            return {
              board: newBoard,
              result: newResult,
              mistakes: newMistakes,
              remainingNumberOptions,
              isPaused: true,
              selectedCell: undefined,
              previousMoves: newPreviousMoves,
            };
          }

          return {
            board: newBoard,
            result: newResult,
            mistakes: newMistakes,
            remainingNumberOptions,
            isPaused: newResult === EGameResult.Lose ? true : s.isPaused,
            selectedCell: newCell,
            previousMoves: newPreviousMoves,
          };
        });
      },

      resetGame: () => {
        set({...initialState});
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
          if (action === EAction.Undo) {
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

          if (action === EAction.Erase) {
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

          if (action === EAction.Notes) {
            return { notesModeActive: !s.notesModeActive };
          }

          if (action === EAction.Hint) {
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

      updateElapsedTimeSeconds: (elapsedTime) => {
        set({ elapsedTimeSeconds: elapsedTime });
      },

      setTimerResetFunction: (timerResetFunction) => {
        set({ timerResetFunction });
      },

      pauseGame: () => {
        set((s) => ({
          isPaused: true,
          selectedCell: undefined,
          lastSelectedCell: s.selectedCell,
        }));
      },

      resumeGame: () => {
        set((s) => ({
          isPaused: false,
          selectedCell: s.lastSelectedCell,
        }));
      },
      
      setElapsedTimeSeconds: (elapsedTimeSeconds) => {
        set({ elapsedTimeSeconds });
      }
    }),
    {
      name: 'gameState',
    }
));

export default useStore;
