import {
  ActionToolbar,
  Board,
  DevelopmentButtons,
  GameInfo,
  Layout,
  Logo,
  NumberSelect,
  OptionsButton,
} from "@/components";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/index";

export default function Game() {
  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: (
          <Link to="/">
            <Logo />
          </Link>
        ),
        right: <OptionsButton />,
      }}
      parentClassName="game"
    >
      <GameInfo />
      <Board />
      <ActionToolbar />
      <NumberSelect />
      <DevelopmentButtons />
    </Layout>
  );
}
