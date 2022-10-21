import { AiOutlineHome, AiOutlineCalendar, AiOutlineBarChart } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export enum EAction {
  Home = "Home",
  DailyChallenges = "Daily Challenges",
  Statistics = "Statistics",
}

export interface IAction {
  label: EAction;
  icon: JSX.Element;
  path: string;
}

const availableActions: IAction[] = [
  {
    label: EAction.Home,
    icon: <AiOutlineHome />,
    path: "/",
  },
  {
    label: EAction.DailyChallenges,
    icon: <AiOutlineCalendar />,
    path: "/daily-challenges",
  },
  {
    label: EAction.Statistics,
    icon: <AiOutlineBarChart />,
    path: "/statistics",
  },
];

const WelcomeToolbar = () => {
  return (
    <div className="welcome-toolbar">
      <ul className="welcome-toolbar__options">
        {availableActions.map((action: IAction) => {
          const { label, icon, path } = action;

          return (
            <li
              key={label}
              className="welcome-toolbar__option"
            >
              <NavLink
                end
                to={path}
                className="welcome-toolbar__link button"
              >
                <span className="welcome-toolbar__icon">{icon}</span>
                <span className="welcome-toolbar__label">{label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WelcomeToolbar;
