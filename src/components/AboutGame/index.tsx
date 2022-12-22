import { BackButton, Layout, Logo, WelcomeToolbar } from "@/components";

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
      <div className="about-game__wrapper">
        <Logo />
        <div className="about-game__message">
          <p>This game was created after playing several games of Killer Sudoku during a flight.</p>
          <p>
            Since my phone was in Airplane mode, I didn't see any ads and it was glorious! I so
            enjoyed playing with no ads that I decided to build my own version of the game.
          </p>
          <p>This is that game.</p>
          <p className="about-game__salutation">
            - <a href="https://github.com/sprioleau">San&apos;Quan Prioleau</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
