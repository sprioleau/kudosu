import { RiArrowLeftSLine, RiSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components";

const Header = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__action-buttons">
        <button
          className="header__action-button"
          onClick={handleGoBack}
        >
          <RiArrowLeftSLine />
        </button>
      </div>
      <Logo />
      <div className="header__action-buttons">
        <button className="header__action-button">
          <RiSettingsLine />
        </button>
      </div>
    </header>
  );
};

export default Header;
