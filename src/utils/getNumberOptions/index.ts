import { SUDOKU_PUZZLE_SIZE } from "@/constants";

const getNumberOptions = (size: number = SUDOKU_PUZZLE_SIZE) => {
  return [...Array(size).keys()].map((_, i) => i + 1);
};

export default getNumberOptions;
