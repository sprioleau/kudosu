import { BackButton, Layout, WelcomeToolbar } from "@/components";
import dayjs from "dayjs";
import { DailyChallengesCalendar } from "@/components";
import { useEffect, useState } from "react";
import { useDailyChallenge } from "@/hooks";
import localforage from "localforage";
import { IInitialState } from "@/store";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";

export type TProgressMap = Record<number, number>;

async function getGameProgressByDayIndex(callback: (data: TProgressMap) => void) {
  const gameProgressByDayIndex: TProgressMap = {};

  await localforage.iterate((gameState: IInitialState) => {
    if (!gameState || !gameState.dailyChallengeDayIndex) return;

    const progress =
      (100 * (SUDOKU_PUZZLE_SIZE - (gameState.remainingNumberOptions?.length ?? 0))) /
      SUDOKU_PUZZLE_SIZE;

    gameProgressByDayIndex[gameState.dailyChallengeDayIndex] = progress;
  });

  return callback(gameProgressByDayIndex);
}

export default function DailyChallenges() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [progressByDayIndex, setProgressByDayIndex] = useState<Record<number, number>>();

  useEffect(() => {
    getGameProgressByDayIndex(setProgressByDayIndex);
  }, []);

  const handleSelectDate = (dayOfMonth: number) => {
    const newSelectedDate = selectedDate.date(dayOfMonth);
    setSelectedDate(newSelectedDate);
  };

  const handleAdvanceMonth = (direction: -1 | 1) => {
    let newSelectedDate = selectedDate;
    if (direction === -1) newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    if (direction === 1) newSelectedDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const progressForSelectedDate = progressByDayIndex?.[selectedDate.dayOfYear()] ?? 0;
  const shouldShowContinue = progressForSelectedDate > 0;

  const { onStartDailyChallenge } = useDailyChallenge({ date: selectedDate });

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>{selectedDate.format("MMMM YYYY")}</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="daily-challenges"
    >
      <div className="daily-challenges__image">
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
          progressByDayIndex={progressByDayIndex}
        />
      </div>
      <button
        className="daily-challenges__play-button rounded-full"
        onClick={onStartDailyChallenge}
      >
        {shouldShowContinue ? "Continue" : "Play"} {selectedDate.format("MMMM Do")}
      </button>
    </Layout>
  );
}
