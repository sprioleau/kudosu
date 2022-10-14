import { BackButton, Layout, WelcomeToolbar } from "@/components";

type Props = {};

export default function AboutGame({}: Props) {
  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>About Game</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="about-game"
    >
      About the game
    </Layout>
  );
}
