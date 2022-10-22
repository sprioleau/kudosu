import { getSudoku } from "sudoku-gen";
import { writeFileSync } from "fs"

const DAYS_IN_YEAR = 365;

function generatePuzzlesByDate() { 
  const puzzles: Record<string, string> = {};

  Array.from(Array(DAYS_IN_YEAR)).forEach((_, index) => {
    const difficulties = ["easy", "medium", "hard", "expert"];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

    const { puzzle, solution, difficulty } = getSudoku(randomDifficulty);

    // prettier-ignore
    puzzles[index + 1] = `${difficulties.indexOf(difficulty)}${puzzle.replace(/-/g, "0")}${solution}`;
  });
  
  try {
    writeFileSync('src/constants/puzzlesByDay.json', JSON.stringify(puzzles), { flag: 'w+' });
    console.log(puzzles);
  } catch (error) {
    console.log(error);
  }
};

generatePuzzlesByDate();