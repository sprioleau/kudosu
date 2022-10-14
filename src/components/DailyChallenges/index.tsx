import { BackButton, Layout, WelcomeToolbar } from "@/components";

export default function DailyChallenges() {
  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>Daily Challenges</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="daily-challenges"
    >
      Here are your daily challenges
    </Layout>
  );
}
