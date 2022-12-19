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
};

const pages: TInstructionsPage[] = [
  {
    title: "Understanding the board",
    content: (
      <ul>
        <li>Sudoku grid consists of 9x9 spaces.</li>
        <li>You can use only numbers from 1 to 9.</li>
        <li>Each 3×3 block can only contain numbers from 1 to 9.</li>
        <li>Each vertical column can only contain numbers from 1 to 9.</li>
      </ul>
    ),
  },
  {
    title: "Rules to solving a puzzle",
    content: (
      <ul>
        <li>Each horizontal row can only contain numbers from 1 to 9.</li>
        <li>
          Each number in the 3×3 block, vertical column or horizontal row can be used only once.
        </li>
        <li>The game is over when the whole Sudoku grid is correctly filled with numbers.</li>
      </ul>
    ),
  },
  {
    title: "Notes",
    content: (
      <ul>
        <li>
          Turn on <b>Notes</b> mode to add and remove notes.
        </li>
      </ul>
    ),
  },
  {
    title: "Hints",
    content: (
      <ul>
        <li>
          If you get stuck, feel free to use a <b>Hint</b> to solve a puzzle cell.
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
          <h3>{pages[currentPageIndex].title}</h3>
        </header>
        <main className="how-to-play__main">
          <div className="how-to-play__image"></div>
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
