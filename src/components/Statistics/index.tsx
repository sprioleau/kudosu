import { useEffect, useState } from "react";
import { MdOutlineGridOn } from "react-icons/md";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";
import { TbAward, TbCrown } from "react-icons/tb";
import { BiTrophy } from "react-icons/bi";
import { StatisticsList, WelcomeToolbar, Layout, BackButton } from "@/components";
import { FiAward } from "react-icons/fi";
import dayjs from "dayjs";
import { getGamesPlayed } from "@/utils";

const gameTypes = ["Easy", "Medium", "Hard", "Expert", "Daily Challenges"];

export interface IGameStatistic {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

interface IStatisticsList {
  title: string;
  stats: IGameStatistic[];
}

interface GameStatistics {
  totalGames: number;
  gamesWon: number;
  winRate: number | undefined;
  winsWithNoMistakes: number;
  winsWithNoHints: number;
  bestTimeInSeconds: number | undefined;
  averageTimeInSeconds: number | undefined;
}

export default function Statistics() {
  const [gameType, setGameType] = useState(gameTypes[0]);
  const [gameStatistics, setGameStatistics] = useState<GameStatistics>();

  useEffect(() => {
    getGamesPlayed().then(setGameStatistics);
  }, []);

  if (!gameStatistics) return null;

  const statistics: IStatisticsList[] = [
    {
      title: "Games",
      stats: [
        {
          label: "Total",
          icon: <MdOutlineGridOn />,
          value: gameStatistics.totalGames,
        },
        {
          label: "Games Won",
          icon: <TbCrown />,
          value: gameStatistics.gamesWon,
        },
        {
          label: "Win Rate",
          icon: <FiAward />,
          value: gameStatistics.winRate ? `${gameStatistics.winRate}%` : "0%",
        },
        {
          label: "Wins with No Mistakes",
          icon: <TbAward />,
          value: gameStatistics.winsWithNoMistakes,
        },
        {
          label: "Wins with No Hints",
          icon: <BiTrophy />,
          value: gameStatistics.winsWithNoHints,
        },
      ],
    },
    {
      title: "Time",
      stats: [
        {
          label: "Best Time",
          icon: <RiTimerFlashLine />,
          value: gameStatistics.bestTimeInSeconds ?? "N/A",
        },
        {
          label: "Average Time",
          icon: <RiTimerLine />,
          value: gameStatistics.averageTimeInSeconds
            ? dayjs.duration(gameStatistics.averageTimeInSeconds, "seconds").format("H:mm:ss")
            : "N/A",
        },
      ],
    },
  ];

  const handleUpdateGameType = (type: string) => {
    setGameType(type);
  };

  const getGameTypeLabelClasses = (type: string) => {
    let className = "statistics__game-type-button";
    if (type === gameType) className += " active";
    return className;
  };

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1 className="statistics__title">Statistics</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="statistics"
    >
      <ul className="statistics__game-types">
        {gameTypes.map((label) => (
          <li key={label}>
            <button
              className={getGameTypeLabelClasses(label)}
              onClick={() => handleUpdateGameType(label)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
      <div className="statistics__list">
        <StatisticsList statistics={statistics} />
      </div>
    </Layout>
  );
}
