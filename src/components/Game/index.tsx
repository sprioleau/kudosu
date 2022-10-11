import { ActionToolbar, Board, GameInfo, Header, NumberSelect } from "@/components";

export default function Game() {
  return (
    <>
      <Header
        showLogo
        showBackButton
      />
      <GameInfo />
      <Board />
      <ActionToolbar />
      <NumberSelect />
    </>
  );
}
