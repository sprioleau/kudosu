import useGameStore from "@/store";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

export default function useDailyChallenge({ date }: { date?: Dayjs }) {
  const createBoardFromDayIndex = useGameStore((s) => s.createBoardFromDayIndex);
  const navigate = useNavigate();

  const onStartDailyChallenge = async () => {
    createBoardFromDayIndex({
      dayIndex: (date ?? dayjs()).dayOfYear(),
      onBoardCreated: () => navigate("/game"),
    });
  };

  return { onStartDailyChallenge };
}
