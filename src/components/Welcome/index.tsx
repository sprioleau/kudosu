import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DailyChallengeCard, Logo } from "@/components";

export default function Welcome() {
  const navigate = useNavigate();
  const previousGameStatus = {
    elapsedTime: "1:06",
    difficulty: "Easy",
  };

  const { elapsedTime, difficulty } = previousGameStatus;

  const handleStartNewGame = () => {
    navigate("/game");
  };

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
        <button className="welcome__button">
          Continue Game{" "}
          <span className="welcome__button-secondary text-muted">
            <BiTimeFive />
            &nbsp;{elapsedTime} - {difficulty}
          </span>
        </button>
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
