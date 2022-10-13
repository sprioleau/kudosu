import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BackButton from "../BackButton";
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
    title: "Welcome to the game!",
    content: "How to play Sudoku",
  },
  {
    title: "Page 2",
    content: (
      <ul>
        <ol>Sudoku grid consists of 9x9 spaces.</ol>
        <ol>You can use only numbers from 1 to 9.</ol>
        <ol>Each 3×3 block can only contain numbers from 1 to 9.</ol>
        <ol>Each vertical column can only contain numbers from 1 to 9.</ol>
      </ul>
    ),
  },
  {
    title: "Page 3",
    content: (
      <ul>
        <ol>Each horizontal row can only contain numbers from 1 to 9.</ol>
        <ol>
          Each number in the 3×3 block, vertical column or horizontal row can be used only once.
        </ol>
        <ol>The game is over when the whole Sudoku grid is correctly filled with numbers.</ol>
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
      leftContent={<BackButton />}
      centerContent={<h1>How to play</h1>}
      rightContent={<OptionsButton />}
      parentClassName="how-to-play"
    >
      <div
        className="instructions-modal"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
        }}
      >
        <header className="instructions-modal__header">
          <h3>Instructions</h3>
          <span>{pages[currentPageIndex].title}</span>
        </header>
        <main className="instructions-modal__main">{pages[currentPageIndex].content}</main>
        <div
          className="instructions-modal__button-wrapper"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            className="instructions-modal__button"
            onClick={() => handleAdvance(AdvanceDirection.Backwards)}
            disabled={currentPageIndex === 0}
          >
            <BsChevronLeft />
          </button>
          <button
            className="instructions-modal__button"
            onClick={() => handleAdvance(AdvanceDirection.Forwards)}
            disabled={currentPageIndex === pages.length - 1}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </Layout>
  );
}
