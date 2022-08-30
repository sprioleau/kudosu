import useStore from "@/store";
import FocusTrap from "focus-trap-react";
import JSConfetti from "js-confetti";

const GameResult = () => {
  const result = useStore((s) => s.result);
  const resetGame = useStore((s) => s.resetGame);

  if (!result) return null;

  if (result === "Win") {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ["🎉"],
      emojiSize: 100,
      confettiNumber: 30,
    });
  }

  return (
    <FocusTrap>
      <div className="game-result">
        <h2 className="game-result__message">You {result}!</h2>
        <button
          className="game-result__button"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
    </FocusTrap>
  );
};

export default GameResult;
