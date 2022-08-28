import useStore from "@/store";
import { getIsTruthyEqual } from "@/utils";
import { PuzzleCell } from "@/utils/getBoard";

export interface Props {
  key: number;
  cell: PuzzleCell;
}

const Cell = ({ cell }: Props) => {
  const selectedCell = useStore((s) => s.selectedCell);
  const selectCell = useStore((s) => s.selectCell);

  const { row, col, region, value } = cell;

  const selectedRow = selectedCell?.row;
  const selectedCol = selectedCell?.col;
  const selectedRegion = selectedCell?.region;
  const selectedValue = selectedCell?.value;

  const isSelected = getIsTruthyEqual(row, selectedRow) && getIsTruthyEqual(col, selectedCol);

  let buttonClasses = "cell__button";

  if (isSelected) buttonClasses += " selected";
  if (cell.isCorrect) {
    buttonClasses += " correct";
  } else if (!cell.isCorrect && !cell.isGiven) {
    buttonClasses += " incorrect";
  }

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
        data-row-selected={getIsTruthyEqual(row, selectedRow)}
        data-col-selected={getIsTruthyEqual(col, selectedCol)}
        data-region-selected={getIsTruthyEqual(region, selectedRegion)}
        data-value-selected={getIsTruthyEqual(value, selectedValue)}
        onClick={handleSelect}
      >
        {value ?? ""}
      </button>
    </li>
  );
};

export default Cell;