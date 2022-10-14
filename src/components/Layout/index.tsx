import Header from "../Header";

interface Props {
  children: React.ReactNode;
  headerContent: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
  footerContent?: React.ReactNode;
  parentClassName?: string;
}

export default function Layout({ children, headerContent, footerContent, parentClassName }: Props) {
  const layoutClasses = ["layout", parentClassName].join(" ");
  const mainClasses = ["layout__main", parentClassName ? `${parentClassName}__main` : ""].join(" ");
  const footerClasses = [
    "layout__footer",
    parentClassName ? `${parentClassName}__footer` : "",
  ].join(" ");

  return (
    <div className={layoutClasses}>
      <Header headerContent={headerContent} />
      <main className={mainClasses}>{children}</main>
      {footerContent && <footer className={footerClasses}>{footerContent}</footer>}
    </div>
  );
}
