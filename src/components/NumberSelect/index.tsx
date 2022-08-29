import { SUDOKU_PUZZLE_SIZE } from "@/constants";
import useStore from "@/store";

const NumberSelect = () => {
  const selectNumberOption = useStore((s) => s.selectNumberOption);
  const options = [...Array(SUDOKU_PUZZLE_SIZE).keys()].map((_, i) => i + 1);

  const handleNumberSelect = (value: number) => {
    selectNumberOption(value);
  };

  // const handleNumberSelectWithKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  //   console.log(e.key);

  //   selectNumberOption(2);
  // };

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
              onClick={() => handleNumberSelect(number)}
              // onKeyDown={handleNumberSelectWithKey}
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
