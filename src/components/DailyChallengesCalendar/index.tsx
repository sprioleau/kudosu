import dayjs from "dayjs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { DailyChallengesDateButton, IconButton } from "@/components";
import { useCallback } from "react";
import { TProgressMap } from "@/utils/getGameProgressByDayOfYear";

interface IProps {
  selectedDate: dayjs.Dayjs;
  onDateSelect: (date: number) => void;
  progressByDayOfYear: TProgressMap | undefined;
}

export default function DailyChallengesCalendar({
  selectedDate,
  onDateSelect,
  progressByDayOfYear,
}: IProps) {
  const currentDate = dayjs();
  const daysInMonth = selectedDate.daysInMonth();
  const dates = [...Array.from({ length: daysInMonth }).keys()].map((index) => index + 1);
  const firstDayOfMonthIndex = selectedDate.startOf("month").format("d");

  // prettier-ignore
  const handleDateSelect = useCallback((dayOfMonth: number) => {
    return () => onDateSelect(dayOfMonth);
  }, [onDateSelect]);

  // prettier-ignore
  const getShouldDisableDateButton = useCallback((dayOfMonth: number) => {
    const date = dayjs(`${selectedDate.format("YYYY-MM")}-${dayOfMonth}`);
    return date.isAfter(currentDate);
  }, [currentDate, selectedDate]);

  return (
    <div className="daily-challenges-calendar">
      <div className="daily-challenges-calendar__calendar">
        <div
          className="daily-challenges-calendar__spacer"
          style={{
            gridColumn: `span ${firstDayOfMonthIndex}`,
          }}
        />
        {dates.map((dayOfMonth) => {
          const dayOfYear = dayjs(`${selectedDate.format("YYYY-MM")}-${dayOfMonth}`).dayOfYear();

          return (
            <DailyChallengesDateButton
              key={dayOfMonth}
              selected={dayOfMonth === selectedDate.date()}
              disabled={getShouldDisableDateButton(dayOfMonth)}
              dayOfMonth={dayOfMonth}
              progressPercentage={progressByDayOfYear?.[dayOfYear] ?? 0}
              handleDateSelect={handleDateSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
