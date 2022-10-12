interface IProps {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Header = ({ leftContent, rightContent, centerContent }: IProps) => {
  if (!leftContent && !rightContent && !centerContent) return null;

  return (
    <header className="header">
      {leftContent && <div className="header__left">{leftContent}</div>}
      {centerContent && <div className="header__center">{centerContent}</div>}
      {rightContent && <div className="header__right">{rightContent}</div>}
    </header>
  );
};

export default Header;
