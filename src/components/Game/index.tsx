import {
  ActionToolbar,
  Board,
  GameInfo,
  Header,
  Logo,
  NumberSelect,
  SettingsButton,
} from "@/components";
import BackButton from "../BackButton/index";

export default function Game() {
  return (
    <div className="game">
      <header className="game__header">
        <Header
          leftContent={<BackButton />}
          centerContent={<Logo />}
          rightContent={<SettingsButton />}
        />
      </header>
      <main className="game__main">
        <GameInfo />
        <Board />
        <ActionToolbar />
        <NumberSelect />
      </main>
    </div>
  );
}
