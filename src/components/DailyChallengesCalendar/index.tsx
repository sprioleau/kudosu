import dayjs from "dayjs";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { IconButton } from "@/components";

interface IProps {
  selectedDate: dayjs.Dayjs;
  onDateSelect: (date: number) => void;
  onAdvanceMonth: (direction: -1 | 1) => void;
}

export default function DailyChallengesCalendar({
  selectedDate,
  onDateSelect,
  onAdvanceMonth,
}: IProps) {
  const currentDate = dayjs();
  const daysInMonth = selectedDate.daysInMonth();
  // console.log("Calendar selectedDate:", selectedDate.format("MMMM d"));
  const dates = [...Array.from({ length: daysInMonth }).keys()].map((index) => index + 1);
  const firstDayOfMonthIndex = selectedDate.startOf("month").format("d");

  return (
    <div className="daily-challenges-calendar">
      <div className="daily-challenges-calendar__nav">
        <div className="daily-challenges-calendar__nav-button-wrapper prev">
          <IconButton
            icon={<RiArrowLeftSLine />}
            onClick={() => onAdvanceMonth(-1)}
          />
        </div>
        <div className="daily-challenges-calendar__nav-button-wrapper next">
          <IconButton
            icon={<RiArrowRightSLine />}
            onClick={() => onAdvanceMonth(1)}
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

        {dates.map((dayOfMonth) => (
          <button
            key={dayOfMonth}
            disabled={dayOfMonth > currentDate.date()}
            onClick={() => onDateSelect(dayOfMonth)}
            className="daily-challenges-calendar__date-button rounded-full"
            data-is-selected={dayOfMonth === selectedDate.date()}
          >
            {dayOfMonth}
          </button>
        ))}
      </div>
    </div>
  );
}
