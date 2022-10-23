import useGameStore from "@/store";
import { formatTime } from "@/utils";
import { useNavigate } from "react-router-dom";
import { useDailyChallenge } from "@/hooks";

export default function GameResultModal() {
  const result = useGameStore((s) => s.result);
  const dailyChallengeData = useGameStore((s) => s.dailyChallengeData);
  const elapsedTimeSeconds = useGameStore((s) => s.elapsedTimeSeconds);
  const navigate = useNavigate();

  const { onStartDailyChallenge } = useDailyChallenge({
    dayOfYear: dailyChallengeData?.dayOfYear,
    replace: true,
  });

  const shouldShowRetryOoption = dailyChallengeData && !dailyChallengeData.hasSolved;

  const handleCloseModal = () => {
    if (!shouldShowRetryOoption) return navigate("/");
    return onStartDailyChallenge();
  };

  const getButtonLabel = () => {
    let buttonLabel = "Start New Game";

    if (shouldShowRetryOoption) {
      buttonLabel = "Retry challenge";
    }

    return buttonLabel;
  };

  return (
    <div className="game-result">
      <h2 className="game-result__message">You {result}!</h2>
      <p className="game-result__time">Time: {formatTime(elapsedTimeSeconds)}</p>
      <button
        className="game-result__button"
        onClick={handleCloseModal}
      >
        {getButtonLabel()}
      </button>
    </div>
  );
};