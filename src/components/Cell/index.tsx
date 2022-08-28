import useStore from "@/store";

export interface Cell {
  row: number;
  col: number;
  region: number;
  value: number | undefined;
}

const Cell = ({ row, col, region, value }: Cell) => {
  const selectCell = useStore((s) => s.selectCell);
  const selectedRow = useStore((s) => s.selectedRow);
  const selectedCol = useStore((s) => s.selectedCol);
  const selectedRegion = useStore((s) => s.selectedRegion);
  const selectedNumber = useStore((s) => s.selectedNumber);

  const getIsEqual = (number1: number | undefined, number2: number | undefined) => {
    return number1 && number2 && number1 === number2;
  };

  const isSelected = getIsEqual(row, selectedRow) && getIsEqual(col, selectedCol);

  let buttonClasses = "cell__button";

  if (isSelected) buttonClasses += " selected";

  const handleSelect = () => {
    selectCell({ row, col, region, value });
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
        data-number-selected={getIsEqual(value, selectedNumber)}
        onClick={handleSelect}
      >
        {value ?? ""}
      </button>
    </li>
  );
};

export default Cell;
