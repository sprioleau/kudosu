import { SUDOKU_PUZZLE_SIZE } from "@/constants";

interface Props {}

const NumberSelect = ({}: Props) => {
  const options = [...Array(SUDOKU_PUZZLE_SIZE).keys()].map((_, i) => i + 1);

  const handleNumberSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e.target);
  };

  return (
    <div className="number-select">
      <ol className="number-select__options">
        {options.map((number) => (
          <li
            key={number}
            className="number-select__option"
          >
            <button
              className="number-select__button"
              onClick={handleNumberSelect}
            >
              {number}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NumberSelect;
