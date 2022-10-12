import { useState } from "react";
import { MdOutlineGridOn } from "react-icons/md";
import { FiAward } from "react-icons/fi";
import { RiTimerLine, RiTimerFlashLine } from "react-icons/ri";
import { TbAward, TbCrown } from "react-icons/tb";

const gameTypes = ["Easy", "Medium", "Hard", "Expert", "Daily Challenges"];

interface IGameStatistic {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

interface IStatistics {
  title: string;
  stats: IGameStatistic[];
}

const statistics: IStatistics[] = [
  {
    title: "Games",
    stats: [
      {
        label: "Total",
        icon: <MdOutlineGridOn />,
        value: 1,
      },
      {
        label: "Games Won",
        icon: <TbCrown />,
        value: 1,
      },
      {
        label: "Win Rate",
        icon: <FiAward />,
        value: 1,
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
        value: "00:00",
      },
      {
        label: "Average Time",
        icon: <RiTimerLine />,
        value: "00:00",
      },
    ],
  },
];

export default function Statistics() {
  const [gameType, setGameType] = useState(gameTypes[0]);

  const handleUpdateGameType = (type: string) => {
    setGameType(type);
  };

  const getGameTypeLabelClasses = (type: string) => {
    let className = "statistics__game-type-button";
    if (type === gameType) className += " active";
    return className;
  };

  return (
    <div className="statistics">
      <header className="statistics__header">
        <h1 className="statistics__title">Statistics</h1>
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
      </header>
      <main className="statistics__main">
        <ul className="statistics__list">
          {statistics.map(({ title, stats }) => (
            <li
              key={title}
              className="statistics__list-item"
            >
              <h2 className="statistics__list-item-title">{title}</h2>
              <ul className="statistics__list-item-stats">
                {stats.map(({ label, value, icon }) => (
                  <li
                    key={label}
                    className="statistics__list-item-stat"
                  >
                    <header className="statistics__list-item-stat__header">
                      <span className="statistics__list-item-stat-icon">{icon}</span>
                      <span className="statistics__list-item-stat-value">{value}</span>
                    </header>
                    <main className="statistics__list-item-stat__main">
                      <span className="statistics__list-item-stat-label">{label}</span>
                    </main>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
