import dayjs from "dayjs";
import { BsCalendar4Event } from "react-icons/bs";
import { useDailyChallenge } from "@/hooks";

export default function DailyChallengeCard() {
  const date = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
  });

  const { onStartDailyChallenge } = useDailyChallenge({ date: dayjs() });

  return (
    <button
      className="daily-challenge-card"
      onClick={onStartDailyChallenge}
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
