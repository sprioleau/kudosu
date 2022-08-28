import useStore, { TDifficulty } from "@/store";

const GameInfo = () => {
  const [mistakes, totalMistakes] = useStore((s) => s.mistakes);
  const difficulty = useStore((s) => s.difficulty);

  const formatDifficulty = (difficulty: TDifficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="game-info">
      <span className="game-info__difficulty">Difficulty: {formatDifficulty(difficulty)}</span>
      <span className="game-info__attempts">Mistakes: {`${mistakes}/${totalMistakes}`}</span>
    </div>
  );
};

export default GameInfo;
