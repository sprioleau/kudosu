import {
  ActionToolbar,
  Board,
  GameInfo,
  Layout,
  Logo,
  NumberSelect,
  OptionsButton,
} from "@/components";
import BackButton from "../BackButton/index";

export default function Game() {
  return (
    <Layout
      leftContent={<BackButton />}
      centerContent={<Logo />}
      rightContent={<OptionsButton />}
      parentClassName="game"
    >
      <GameInfo />
      <Board />
      <ActionToolbar />
      <NumberSelect />
    </Layout>
  );
}
