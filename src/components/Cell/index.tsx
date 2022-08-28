import useStore from "@/store";
import { PuzzleCell } from "@/utils/getBoard";

export interface Props {
  key: number;
  cell: PuzzleCell;
}

type TIsEqualValue = number | undefined | null;

const Cell = ({ cell }: Props) => {
  const selectedCell = useStore((s) => s.selectedCell);
  const selectCell = useStore((s) => s.selectCell);

  const { row, col, region, value } = cell;

  const selectedRow = selectedCell?.row;
  const selectedCol = selectedCell?.col;
  const selectedRegion = selectedCell?.region;
  const selectedValue = selectedCell?.value;

  const getIsEqual = (number1: TIsEqualValue, number2: TIsEqualValue) => {
    return number1 && number2 && number1 === number2;
  };

  const isSelected = getIsEqual(row, selectedRow) && getIsEqual(col, selectedCol);

  let buttonClasses = "cell__button";

  if (isSelected) buttonClasses += " selected";

  const handleSelect = () => {
    selectCell(cell);
  };

  return (
    <li className="cell">
      <button
        className={buttonClasses}
        data-row={row}
        data-col={col}
        data-region={region % 2 === 0 ? "even" : "odd"}
        data-row-selected={getIsEqual(row, selectedRow)}
        data-col-selected={getIsEqual(col, selectedCol)}
        data-region-selected={getIsEqual(region, selectedRegion)}
        data-value-selected={getIsEqual(value, selectedValue)}
        onClick={handleSelect}
      >
        {value ?? ""}
      </button>
    </li>
  );
};

export default Cell;