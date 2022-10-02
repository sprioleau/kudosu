import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DailyChallengeCard, DifficultySelectModal, Logo } from "@/components";
import useStore from "@/store";
import { formatTime } from "@/utils";

export default function Welcome() {
  const navigate = useNavigate();
  const updateModalContent = useStore((s) => s.updateModalContent);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const resetGame = useStore((s) => s.resetGame);
  const resumeGame = useStore((s) => s.resumeGame);
  const difficulty = useStore((s) => s.difficulty);

  const handleStartNewGame = () => {
    resetGame();
    updateModalContent(<DifficultySelectModal />)
  };
  
  const handleContinueGame = () => {
    resumeGame();
    navigate("/game");
  }
  
  return (
    <div className="welcome">
      <DailyChallengeCard />
      <header className="welcome__header">
        <Logo />
        <span className="welcome__subtitle">
          by{" "}
          <a
            href="https://github.com/sprioleau"
            target="_blank"
          >
            @sprioleau
          </a>
        </span>
      </header>
      <div className="welcome__buttons">
        {elapsedTimeSeconds > 0 && (
          <button className="welcome__button" onClick={handleContinueGame}>
            Continue Game{" "}
            <span className="welcome__button-secondary text-muted">
              <BiTimeFive />
              &nbsp;{formatTime(elapsedTimeSeconds)} - {difficulty}
            </span>
          </button>
        )}
        <button
          className="welcome__button ghost"
          onClick={handleStartNewGame}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
