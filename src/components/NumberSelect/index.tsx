import useGameStore from "@/store";
import { getNumberOptions } from "@/utils";

const NumberSelect = () => {
  const selectNumberOption = useGameStore((s) => s.selectNumberOption);
  const remainingNumberOptions = useGameStore((s) => s.remainingNumberOptions);
  const options = getNumberOptions();

  if (!remainingNumberOptions) return null;

  const handleNumberSelect = (value: number) => {
    selectNumberOption(value);
  };

  return (
    <div className="number-select">
      <ol className="number-select__options">
        {options.map((number) => (
          <li
            key={number}
            className="number-select__option"
            data-is-visible={remainingNumberOptions.includes(number)}
          >
            <button
              className="number-select__button"
              onClick={() => handleNumberSelect(number)}
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
