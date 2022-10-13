import { RiArrowRightSLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { BsUiChecksGrid } from "react-icons/bs";
import { MdOutlineInfo } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import Layout from "../Layout";

interface IOptionsListItem {
  label: string;
  key: string;
  icon: React.ReactNode;
}

const options: IOptionsListItem[] = [
  {
    label: "Settings",
    icon: <IoSettingsOutline />,
    key: "settings",
  },
  {
    label: "How to Play",
    icon: <BsUiChecksGrid />,
    key: "how-to-play",
  },
  {
    label: "About Game",
    icon: <MdOutlineInfo />,
    key: "about-game",
  },
];

export default function OptionsMenu() {
  const navigate = useNavigate();

  const handleNavigate = (key: string) => navigate(key);

  return (
    <Layout
      leftContent={<BackButton />}
      centerContent={<h1>Options</h1>}
      parentClassName="options-menu"
    >
      <ul className="options-menu__list">
        {options.map(({ key, label, icon }) => (
          <li
            key={key}
            className="options-menu__list-item"
            onClick={() => handleNavigate(key)}
          >
            <button className="options-menu__button">
              <div className="options-menu__label-wrapper">
                <span className="options-menu__icon">{icon}</span>
                <span className="options-menu__label">{label}</span>
              </div>
              <span className="options-menu__arrow">
                <RiArrowRightSLine />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
