import dayjs from "dayjs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { DailyChallengesDateButton, IconButton } from "@/components";
import { useCallback } from "react";
import { TProgressMap } from "@/utils/getGameProgressByDayOfYear";

interface IProps {
  selectedDate: dayjs.Dayjs;
  onDateSelect: (date: number) => void;
  onAdvanceMonth: (direction: -1 | 1) => void;
  progressByDayOfYear: TProgressMap | undefined;
}

export default function DailyChallengesCalendar({
  selectedDate,
  onDateSelect,
  onAdvanceMonth,
  progressByDayOfYear,
}: IProps) {
  console.log("progressByDayOfYear:", progressByDayOfYear);
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

  const shouldDisablePreviousMonthButton = selectedDate.isSame(dayjs("2022-01-01"), "month");
  const shouldDisableNextMonthButton = selectedDate.isSame(currentDate, "month");

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
