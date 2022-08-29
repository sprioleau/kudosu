import useStore from "@/store";

const GameResult = () => {
  const result = useStore((s) => s.result);
  console.log("result:", result);
  const resetGame = useStore((s) => s.resetGame);

  if (!result) return null;

  return (
    <div className="game-result">
      <h2 className="game-result__message">You {result}!</h2>
      <button
        className="game-result__button"
        onClick={resetGame}
      >
        Reset
      </button>
    </div>
  );
};

export default GameResult;
