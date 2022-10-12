import { IGameStatistic } from "../Statistics";

interface IStatisticsList {
  title: string;
  stats: IGameStatistic[];
}

export default function StatisticsList({ statistics }: { statistics: IStatisticsList[] }) {
  if (statistics.length === 0) return null;

  return (
    <ul className="statistics-list">
      {statistics.map(({ title, stats }) => (
        <li
          key={title}
          className="statistics-list__item"
        >
          <h2 className="statistics-list__title">{title}</h2>
          <ul className="statistics-list__stats">
            {stats.map(({ label, value, icon }) => (
              <li
                key={label}
                className="statistics-list__stat"
              >
                <header className="statistics-list__stat__header">
                  <span className="statistics-list__stat-icon">{icon}</span>
                  <span className="statistics-list__stat-value">{value}</span>
                </header>
                <main className="statistics-list__stat__main">
                  <span className="statistics-list__stat-label">{label}</span>
                </main>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
