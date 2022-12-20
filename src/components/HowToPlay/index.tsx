import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BackButton from "../BackButton";
import IconButton from "../IconButton";
import Layout from "../Layout";
import OptionsButton from "../OptionsButton";

enum AdvanceDirection {
  Forwards = 1,
  Backwards = -1,
}

type TInstructionsPage = {
  title: string;
  content: React.ReactNode;
  imageSrc?: string;
};

const pages: TInstructionsPage[] = [
  {
    title: "Understanding the board",
    content: (
      <ul>
        <li>A Sudoku grid consists of 9x9 spaces.</li>
        <li>You can use only numbers from 1 to 9.</li>
      </ul>
    ),
  },
  {
    title: "Rules to solving a puzzle",
    imageSrc: "/images/how-to-play/understanding-the-board.png",
    content: (
      <ul>
        <li>
          Each horizontal <b className="color-row">row</b> can only contain numbers from 1 to 9.
        </li>
        <li>
          The same is true for each vertical <b className="color-column">column</b> and each 3x3{" "}
          <b className="color-block">block</b>.
        </li>
        <li>
          Each number in the 3×3 block, vertical column or horizontal row can be used only once.
        </li>
      </ul>
    ),
  },
  {
    title: "Winning the game",
    content: (
      <ul>
        <li>The game is over when the whole Sudoku grid is correctly filled with numbers.</li>
      </ul>
    ),
  },
  {
    title: "Notes",
    imageSrc: "/images/how-to-play/notes.png",
    content: (
      <ul>
        <li>
          Turn on <b className="accent-complementary">Notes</b> mode to add and remove notes.
        </li>
      </ul>
    ),
  },
  {
    title: "Hints",
    imageSrc: "/images/how-to-play/hints.png",
    content: (
      <ul>
        <li>
          If you get stuck, feel free to use a <b className="accent-complementary">Hint</b> to solve
          a puzzle cell.
        </li>
      </ul>
    ),
  },
];

export default function HowToPlay() {
  const [currentPageIndex, setCurentPageIndex] = useState(0);

  const handleAdvance = (direction: AdvanceDirection) => {
    setCurentPageIndex((i) => i + direction);
  };

  return (
    <Layout
      headerContent={{
        left: <BackButton />,
        center: <h1>How to play</h1>,
        right: <OptionsButton />,
      }}
      parentClassName="how-to-play"
    >
      <div
        className="how-to-play__wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <header className="how-to-play__header">
          <h3 className="how-to-play__title">{pages[currentPageIndex].title}</h3>
        </header>
        <main className="how-to-play__main">
          <img
            className="how-to-play__image"
            src={pages[currentPageIndex].imageSrc}
          />
          <div className="how-to-play__content">{pages[currentPageIndex].content}</div>
        </main>
        <div
          className="how-to-play__button-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            icon={<BsChevronLeft />}
            onClick={() => handleAdvance(AdvanceDirection.Backwards)}
            disabled={currentPageIndex === 0}
          />
          <IconButton
            icon={<BsChevronRight />}
            onClick={() => handleAdvance(AdvanceDirection.Forwards)}
            disabled={currentPageIndex === pages.length - 1}
          />
        </div>
      </div>
    </Layout>
  );
}
