import BackButton from "../BackButton";
import Layout from "../Layout";

type Props = {};

export default function AboutGame({}: Props) {
  return (
    <Layout
      leftContent={<BackButton />}
      centerContent={<h1>About Game</h1>}
      parentClassName="about-game"
    >
      Some elements
    </Layout>
  );
}
