import { useState } from "react";
import { MdOutlineGridOn } from "react-icons/md";
import { FiAward } from "react-icons/fi";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";
import { TbAward, TbCrown } from "react-icons/tb";
import StatisticsList from "../StatisticsList";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/index";
import Layout from "../Layout";

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

const statistics: IStatisticsList[] = [
  {
    title: "Games",
    stats: [
      {
        label: "Total",
        icon: <MdOutlineGridOn />,
        value: 6,
      },
      {
        label: "Games Won",
        icon: <TbCrown />,
        value: 2,
      },
      {
        label: "Win Rate",
        icon: <FiAward />,
        value: "33.3%",
      },
      {
        label: "Wins with No Mistakes",
        icon: <TbAward />,
        value: 1,
      },
    ],
  },
  {
    title: "Time",
    stats: [
      {
        label: "Best Time",
        icon: <RiTimerFlashLine />,
        value: "04:52",
      },
      {
        label: "Average Time",
        icon: <RiTimerLine />,
        value: "09:26",
      },
      {
        label: "Another Time",
        icon: <RiTimerLine />,
        value: "09:26",
      },
      {
        label: "And another Time",
        icon: <RiTimerLine />,
        value: "09:26",
      },
    ],
  },
];

export default function Statistics() {
  const [gameType, setGameType] = useState(gameTypes[0]);
  const navigate = useNavigate();

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
      leftContent={<BackButton />}
      centerContent={<h1 className="statistics__title">Statistics</h1>}
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
