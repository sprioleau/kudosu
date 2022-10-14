import { BackButton, Layout, WelcomeToolbar } from "@/components";
import dayjs from "dayjs";

export default function DailyChallenges() {
  const month = dayjs().format("MMMM YYYY");

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>{month}</h1>,
      }}
      footerContent={<WelcomeToolbar />}
      parentClassName="daily-challenges"
    >
      <div className="daily-challenges__image"></div>
      Here are your daily challenges
      <button className="daily-challenges__play-button rounded-full">Play</button>
    </Layout>
  );
}
