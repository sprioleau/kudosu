import BackButton from "../BackButton";
import Layout from "../Layout";

type Props = {};

export default function SettingsMenu({}: Props) {
  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>Settings</h1>,
      }}
      parentClassName="about-game"
    >
      <div className="flex-center flex-column">
        <span>This page is a work in progress...</span>
        <span
          role="img"
          style={{ fontSize: 24 }}
        >
          🚧
        </span>
      </div>
    </Layout>
  );
}
