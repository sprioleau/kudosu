import { EDifficulty } from "@/store";

export default function getRandomDifficulty() { 
  const levelsOfDifficulty = Object.values(EDifficulty).length;
  const randomDifficultyIndex = Math.floor(Math.random() * levelsOfDifficulty);
  const randomDifficulty = Object.values(EDifficulty)[randomDifficultyIndex];
  return randomDifficulty;
}