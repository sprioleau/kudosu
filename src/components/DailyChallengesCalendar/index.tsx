import dayjs from "dayjs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IconButton } from "@/components";
import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";
import { IInitialState } from "@/store";
import { SUDOKU_PUZZLE_SIZE } from "@/constants";

interface IProps {
  selectedDate: dayjs.Dayjs;
  onDateSelect: (date: number) => void;
  onAdvanceMonth: (direction: -1 | 1) => void;
}

async function getGameProgressByDayIndex() {
  const gameProgressByDayIndex: Record<number, number> = {};

  await localforage.iterate((gameState: IInitialState) => {
    if (!gameState || !gameState.dailyChallengeDayIndex) return;

    const progress =
      (100 * (SUDOKU_PUZZLE_SIZE - (gameState.remainingNumberOptions?.length ?? 0))) /
      SUDOKU_PUZZLE_SIZE;

    gameProgressByDayIndex[gameState.dailyChallengeDayIndex] = progress;
  });

  return gameProgressByDayIndex;
}

export default function DailyChallengesCalendar({
  selectedDate,
  onDateSelect,
  onAdvanceMonth,
}: IProps) {
  const currentDate = dayjs();
  const daysInMonth = selectedDate.daysInMonth();
  const dates = [...Array.from({ length: daysInMonth }).keys()].map((index) => index + 1);
  const firstDayOfMonthIndex = selectedDate.startOf("month").format("d");

  const [progressByDayIndex, setProgressByDayIndex] = useState<Record<number, number>>();

  useEffect(() => {
    getGameProgressByDayIndex().then(setProgressByDayIndex);
  }, []);

  // prettier-ignore
  const handleDateSelect = useCallback((dayOfMonth: number) => {
    return () => onDateSelect(dayOfMonth);
  }, [onDateSelect]);

  const shouldDisablePreviousMonthButton = selectedDate.isSame(dayjs("2022-01-01"), "month");
  const shouldDisableNextMonthButton = selectedDate.isSame(currentDate, "month");

  const getShouldDisableDateButton = useCallback(
    (dayOfMonth: number) => {
      const date = dayjs(`${selectedDate.format("YYYY-MM")}-${dayOfMonth}`);
      return date.isAfter(currentDate);
    },
    [currentDate, selectedDate],
  );

  return (
    <div className="daily-challenges-calendar">
      <div className="daily-challenges-calendar__nav">
        <div className="daily-challenges-calendar__nav-button-wrapper prev">
          <IconButton
            icon={<RiArrowLeftSLine />}
            onClick={() => onAdvanceMonth(-1)}
            disabled={shouldDisablePreviousMonthButton}
          />
        </div>
        <div className="daily-challenges-calendar__nav-button-wrapper next">
          <IconButton
            icon={<RiArrowRightSLine />}
            onClick={() => onAdvanceMonth(1)}
            disabled={shouldDisableNextMonthButton}
          />
        </div>
      </div>
      <div className="daily-challenges-calendar__calendar">
        <div
          className="daily-challenges-calendar__spacer"
          style={{
            gridColumn: `span ${firstDayOfMonthIndex}`,
          }}
        />
        {dates.map((dayOfMonth) => {
          const dayOfYear = dayjs(`${selectedDate.format("YYYY-MM")}-${dayOfMonth}`).dayOfYear();
          const progress = Math.round(progressByDayIndex?.[dayOfYear] ?? 0);
          const disabled = getShouldDisableDateButton(dayOfMonth);
          const STROKE_LENGTH = 320;
          const arcLength = (STROKE_LENGTH * (progress > 0 ? Math.max(progress, 20) : 0)) / 100;

          return (
            <button
              key={dayOfMonth}
              disabled={disabled}
              onClick={handleDateSelect(dayOfMonth)}
              className={[
                "daily-challenges-calendar__date-button rounded-full",
                `${dayOfMonth === selectedDate.date() ? "selected" : ""}`,
              ].join(" ")}
              data-is-selected={dayOfMonth === selectedDate.date()}
            >
              <svg
                className="daily-challenges-calendar__progress"
                viewBox="0 0 108 108"
                xmlns="http://www.w3.org/2000/svg"
                stroke="var(--c-accent-text)"
                fill="none"
                strokeWidth={8}
                strokeOpacity={disabled ? 0 : 1}
              >
                <circle
                  cx="54"
                  cy="54"
                  r="50"
                  strokeDasharray={`${arcLength} 2000`}
                />
              </svg>
              {dayOfMonth}
            </button>
          );
        })}
      </div>
    </div>
  );
}
