import Header from "../Header";

interface Props {
  leftContent?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  children: React.ReactNode;
  parentClassName?: string;
}

export default function Layout({
  children,
  parentClassName,
  leftContent,
  centerContent,
  rightContent,
}: Props) {
  return (
    <div className={["layout", parentClassName].join(" ")}>
      <Header
        leftContent={leftContent}
        centerContent={centerContent}
        rightContent={rightContent}
      />
      <main
        className={["layout__main", parentClassName ? `${parentClassName}__main` : ""].join(" ")}
      >
        {children}
      </main>
    </div>
  );
}
