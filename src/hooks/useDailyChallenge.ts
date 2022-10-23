import useGameStore from "@/store";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

export default function useDailyChallenge({
  date,
  dayOfYear,
  replace = false,
}: {
  date?: Dayjs;
  dayOfYear?: number;
  replace?: boolean;
}) {
  const createBoardFromDayOfYear = useGameStore((s) => s.createBoardFromDayOfYear);
  const navigate = useNavigate();

  const onStartDailyChallenge = async () => {
    createBoardFromDayOfYear({
      dayOfYear: dayOfYear ?? (date ?? dayjs()).dayOfYear(),
      onBoardCreated: () => navigate("/game", { replace }),
    });
  };

  return { onStartDailyChallenge };
}
