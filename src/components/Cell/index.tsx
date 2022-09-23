import useStore, { EGameResult, TDirection } from "@/store";
import { getIsTruthyEqual, getNumberOptions } from "@/utils";
import { IPuzzleCell } from "@/utils/getBoard";

export interface IProps {
  key: number;
  cell: IPuzzleCell;
}

const Cell = ({ cell }: IProps) => {
  const selectedCell = useStore((s) => s.selectedCell);
  const selectCell = useStore((s) => s.selectCell);
  const selectNumberOption = useStore((s) => s.selectNumberOption);
  const navigateToNextCell = useStore((s) => s.navigateToNextCell);
  const timerIsRunning = useStore((s) => s.timerIsRunning);
  const result = useStore((s) => s.result);

  const { row, col, region, value, isCorrect, isGiven, notes } = cell;

  const selectedRow = selectedCell?.row;
  const selectedCol = selectedCell?.col;
  const selectedRegion = selectedCell?.region;
  const selectedValue = selectedCell?.value;

  const isSelected = getIsTruthyEqual(row, selectedRow) && getIsTruthyEqual(col, selectedCol);

  let buttonClasses = "cell__button";

  if (isSelected) buttonClasses += " selected";

  if (cell.isCorrect) {
    buttonClasses += " correct";
  } else if (cell.value && !isCorrect && !isGiven) {
    buttonClasses += " incorrect";
  }

  const handleSelectCell = () => {
    selectCell(cell);
  };

  const handleSelectWithKeyboard = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const validNumberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    const key = e.key;

    if (!selectedCell) return;
    if (![...validNumberKeys, ...arrowKeys].includes(key)) return;
    if (validNumberKeys.includes(key)) selectNumberOption(Number(key));
    if (arrowKeys.includes(key)) {
      const direction = key.replace("Arrow", "") as TDirection;
      navigateToNextCell(direction);
    }
  };

  const shouldShowNotes = !isGiven && value == null;
  const shouldShowValue = timerIsRunning || result === EGameResult.Win || import.meta.env.DEV;
  const numberOptions = getNumberOptions();

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
        data-value-incorrect={value && !isCorrect && !isGiven}
        onClick={handleSelectCell}
        onKeyDown={handleSelectWithKeyboard}
      >
        {shouldShowValue && (
          <>
            {shouldShowNotes ? (
              <ol className="cell__notes">
                {numberOptions.map((number: number) => (
                  <div
                    key={number}
                    className="cell__note"
                    data-is-visible={notes.includes(number)}
                  >
                    {number}
                  </div>
                ))}
              </ol>
            ) : (
              <>{value}</>
            )}
          </>
        )}
      </button>
    </li>
  );
};

export default Cell;
