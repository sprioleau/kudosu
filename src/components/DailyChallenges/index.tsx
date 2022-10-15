import { BackButton, Layout, WelcomeToolbar } from "@/components";
import dayjs from "dayjs";
import { DailyChallengesCalendar } from "@/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore, { EDifficulty } from "@/store";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

export default function DailyChallenges() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const resetGame = useStore((s) => s.resetGame);
  const createBoard = useStore((s) => s.createBoard);
  const navigate = useNavigate();

  // prettier-ignore
  const handleSelectDate = (dayOfMonth: number) => {
    const newSelectedDate = selectedDate.date(dayOfMonth);
    console.log('dayOfMonth:', {dayOfMonth, newSelectedDate: newSelectedDate.format('MMMM Do')});
    setSelectedDate(newSelectedDate);
  };

  // prettier-ignore
  const handleAdvanceMonth = (direction: -1 | 1) => {
    let newSelectedDate = selectedDate;
    if (direction === -1) newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    if (direction === 1) newSelectedDate = dayjs(selectedDate).add(1, "month");
    console.log("handleAdvanceMonth newSelectedDate:", newSelectedDate.format("MMMM Do"));
    setSelectedDate(newSelectedDate);
  };

  const handleStartNewGame = () => {
    resetGame();
    createBoard(EDifficulty.easy, () => navigate("/game"));
  };

  const hues = [233, 273, 333, 22];
  const hue = hues[selectedDate.month() % hues.length];

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>{selectedDate.format("MMMM YYYY")}</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="daily-challenges"
    >
      <div
        className="daily-challenges__image"
        style={{
          background: `radial-gradient(
            hsl(${hue}, 100%, 65%), 
            hsl(${hue + 10}, 100%, 45%)
          )`,
        }}
      >
        <img
          src="images/logo_outline.svg"
          alt="kudosu logo outlined"
          className="daily-challenges__logo-outlined"
        />
        <img
          src="images/rays_1.svg"
          alt="conical rays"
          className="daily-challenges__rays rays-1"
        />
        <img
          src="images/rays_2.svg"
          alt="conical rays"
          className="daily-challenges__rays rays-2"
        />
      </div>
      <div className="daily-challenges__calendar">
        <DailyChallengesCalendar
          selectedDate={selectedDate}
          onDateSelect={handleSelectDate}
          onAdvanceMonth={handleAdvanceMonth}
        />
      </div>
      <button
        className="daily-challenges__play-button rounded-full"
        onClick={handleStartNewGame}
      >
        Play {selectedDate.format("MMMM Do")}
      </button>
    </Layout>
  );
}
