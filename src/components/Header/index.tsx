import { GameInfo } from "@/components";

const Header = () => {
  return (
    <header className="header">
      <div className="header__title-wrapper">
        <img
          src="/images/logo.svg"
          className="header__logo"
        />
        <h1 className="header__title">Kudosu</h1>
      </div>
      <GameInfo />
    </header>
  );
};

export default Header;
