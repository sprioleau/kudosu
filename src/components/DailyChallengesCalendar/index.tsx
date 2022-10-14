import dayjs from "dayjs";

export default function DailyChallengesCalendar() {
  const month = dayjs().format("MMMM YYYY");
  console.log("month:", month);

  return <div className="daily-challenges-calendar">Calendar</div>;
}
