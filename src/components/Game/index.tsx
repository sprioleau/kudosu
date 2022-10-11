import { ActionToolbar, Board, GameInfo, Header, NumberSelect } from "@/components";

export default function Game() {
  return (
    <>
      <Header />
      <GameInfo />
      <Board />
      <ActionToolbar />
      <NumberSelect />
    </>
  );
}
