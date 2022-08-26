import { makepuzzle, solvepuzzle, ratepuzzle } from "sudoku";

type PuzzleArray = number[];

const SUDOKU_PUZZLE_SIZE = 9;

const index = () => {
  const puzzle = makepuzzle();
  const solution = solvepuzzle(puzzle);

  const getBoardLayout = (puzzleArray: PuzzleArray, solutionsArray: PuzzleArray) => {
    const cells = [];
    let count = 0;

    for (let row = 0; row < SUDOKU_PUZZLE_SIZE; row++) {
      for (let col = 0; col < SUDOKU_PUZZLE_SIZE; col++) {
        const initialValue = puzzleArray[count];
        const correctValue = solutionsArray[count];

        cells.push({
          key: count,
          row,
          col,
          initialValue,
          correctValue,
        });

        count++;
      }
    }

    return cells;
  };

  const board = getBoardLayout(puzzle, solution);
  console.log({ board, puzzle, solution });

  return (
    <div className="board">
      <ol className="board__cells">
        {board.map(({ key, initialValue }) => (
          <li
            key={key}
            className="board__cell"
          >
            <button className="board__button">{initialValue ?? ""}</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default index;
