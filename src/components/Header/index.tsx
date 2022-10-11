import { RiArrowLeftSLine, RiSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Logo } from "@/components";

interface IProps {
  showBackButton?: boolean;
  showLogo?: boolean;
}

const Header = ({ showLogo = false, showBackButton = false }: IProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header__action-buttons">
        {showBackButton && (
          <button
            className="header__action-button"
            onClick={handleGoBack}
          >
            <RiArrowLeftSLine />
          </button>
        )}
      </div>
      {showLogo && <Logo />}
      <div className="header__action-buttons">
        <button className="header__action-button">
          <RiSettingsLine />
        </button>
      </div>
    </header>
  );
};

export default Header;
