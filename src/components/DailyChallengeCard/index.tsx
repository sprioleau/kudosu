import useGameStore from "@/store";
import { getRandomDifficulty } from "@/utils";
import { BsCalendar4Event } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function DailyChallengeCard() {
  const createBoard = useGameStore((s) => s.createBoard);

  const date = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const navigate = useNavigate();

  const handleStartDailyChallenge = () => {
    const randomDifficulty = getRandomDifficulty();
    createBoard(randomDifficulty, () => navigate("/game"));
  };

  return (
    <button
      className="daily-challenge-card"
      onClick={handleStartDailyChallenge}
    >
      <header className="daily-challenge-card__header">
        <div className="daily-challenge-card__icon">
          <BsCalendar4Event />
        </div>
        <span className="daily-challenge-card__title">Daily Challenge</span>
      </header>
      <main className="daily-challenge-card__main">
        <span className="daily-challenge-card__date text-muted">{date}</span>
        <span className="daily-challenge-card__action">Play</span>
      </main>
    </button>
  );
}
