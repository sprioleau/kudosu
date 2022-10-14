interface IProps {
  headerContent: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
}

const Header = ({ headerContent: { left, right, center } }: IProps) => {
  if (!left && !center && !right) return null;

  return (
    <header className="header">
      {left && <div className="header__left">{left}</div>}
      {center && <div className="header__center">{center}</div>}
      {right && <div className="header__right">{right}</div>}
    </header>
  );
};

export default Header;
