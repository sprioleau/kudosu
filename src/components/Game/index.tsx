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
import useGameStore, { EGameResult } from "@/store";
import { showConfetti } from "@/utils";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/index";

export default function Game() {
  const result = useGameStore((s) => s.result);

  useEffect(() => {
    if (!result) return;
    if (result === EGameResult.Win) showConfetti();
  }, [result, showConfetti]);

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
