import { BackButton, IconButton, Layout, WelcomeToolbar } from "@/components";
import dayjs from "dayjs";
import { DailyChallengesCalendar } from "@/components";
import { useEffect, useState } from "react";
import { useDailyChallenge } from "@/hooks";
import { getGameProgressByDayOfYear } from "@/utils";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export default function DailyChallenges() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [progressByDayOfYear, setProgressByDayIndex] = useState<Record<number, number>>();
  const { onStartDailyChallenge } = useDailyChallenge({ date: selectedDate });

  useEffect(() => {
    getGameProgressByDayOfYear(setProgressByDayIndex);
  }, []);

  const handleSelectDate = (dayOfMonth: number) => {
    const newSelectedDate = selectedDate.date(dayOfMonth);
    setSelectedDate(newSelectedDate);
  };

  const handleAdvanceMonth = (direction: -1 | 1) => {
    let newSelectedDate = selectedDate;
    if (direction === -1) newSelectedDate = selectedDate.subtract(1, "month");
    if (direction === 1) newSelectedDate = selectedDate.add(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const getButtonLabel = () => {
    let label = "Play";
    const formattedDate = selectedDate.format("MMMM Do");
    const progressForSelectedDate = progressByDayOfYear?.[selectedDate.dayOfYear()] ?? 0;

    if (progressForSelectedDate === 100) return `Solve ${formattedDate} again`;
    if (progressForSelectedDate > 0) label = "Continue";

    return `${label} ${formattedDate}`;
  };

  const shouldDisablePreviousMonthButton = selectedDate.isSame(dayjs("2022-01-01"), "month");
  const shouldDisableNextMonthButton = selectedDate.isSame(dayjs(), "month");
  console.log("selectedDate.month():", selectedDate.month());

  const trophyFilename = `trophy_${((selectedDate.month() + 1) % 8) + 1}.svg`;

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>{selectedDate.format("MMMM YYYY")}</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="daily-challenges"
    >
      <div className="daily-challenges__image-wrapper">
        <img
          src={`images/trophies/${trophyFilename}`}
          alt="trophy"
          className="daily-challenges__trophy"
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
        <div className="daily-challenges__nav">
          <div className="daily-challenges__nav-button-wrapper prev">
            <IconButton
              icon={<RiArrowLeftLine />}
              onClick={() => handleAdvanceMonth(-1)}
              disabled={shouldDisablePreviousMonthButton}
            />
          </div>
          <div className="daily-challenges__nav-button-wrapper next">
            <IconButton
              icon={<RiArrowRightLine />}
              onClick={() => handleAdvanceMonth(1)}
              disabled={shouldDisableNextMonthButton}
            />
          </div>
        </div>
      </div>
      <div className="daily-challenges__calendar">
        <DailyChallengesCalendar
          selectedDate={selectedDate}
          onDateSelect={handleSelectDate}
          progressByDayOfYear={progressByDayOfYear}
        />
      </div>
      <button
        className="daily-challenges__play-button rounded-full"
        onClick={onStartDailyChallenge}
      >
        {getButtonLabel()}
      </button>
    </Layout>
  );
}
