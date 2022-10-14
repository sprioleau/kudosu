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
      Some settings
    </Layout>
  );
}
