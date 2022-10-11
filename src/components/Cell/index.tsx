import useStore, { EGameResult } from "@/store";
import {
  getCellButtonClasses,
  getIsTruthyEqual,
  getNumberOptions,
  handleSelectCellWithKeyboard,
} from "@/utils";
import { IPuzzleCell } from "@/utils/getBoard";
import { useEffect, createRef, useCallback } from "react";

export interface IProps {
  key: number;
  cell: IPuzzleCell;
}

const Cell = ({ cell }: IProps) => {
  const selectCell = useStore((s) => s.selectCell);
  const selectedCell = useStore((s) => s.selectedCell);
  const selectNumberOption = useStore((s) => s.selectNumberOption);
  const navigateToNextCell = useStore((s) => s.navigateToNextCell);
  const isPaused = useStore((s) => s.isPaused);
  const result = useStore((s) => s.result);
  const cellRef = createRef<HTMLButtonElement>();

  useEffect(() => {
    if (!cellRef.current) return;
    if (cell.key === selectedCell?.key) cellRef.current.focus();
  }, [selectedCell, cell.key, cellRef]);

  const { row, col, region, value, isCorrect, isGiven, notes } = cell;

  const selectedRow = selectedCell?.row;
  const selectedCol = selectedCell?.col;
  const selectedRegion = selectedCell?.region;
  const selectedValue = selectedCell?.value;

  const handleSelectCell = useCallback(() => selectCell(cell), [cell]);

  const handleKeyDownSelectCell = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      handleSelectCellWithKeyboard(e, { selectedCell, navigateToNextCell, selectNumberOption });
    },
    [selectedCell, navigateToNextCell, selectNumberOption],
  );

  const shouldShowNotes = !isGiven && value == null;
  const shouldShowValue = !isPaused || result === EGameResult.Win || import.meta.env.DEV;
  const numberOptions = getNumberOptions();

  return (
    <li className="cell">
      <button
        ref={cellRef}
        className={getCellButtonClasses({ cell, selectedCell })}
        data-row={row}
        data-col={col}
        data-region={region % 2 === 0 ? "even" : "odd"}
        data-row-selected={getIsTruthyEqual(row, selectedRow)}
        data-col-selected={getIsTruthyEqual(col, selectedCol)}
        data-region-selected={getIsTruthyEqual(region, selectedRegion)}
        data-value-selected={getIsTruthyEqual(value, selectedValue)}
        data-value-incorrect={value && !isCorrect && !isGiven}
        onClick={handleSelectCell}
        onKeyDown={handleKeyDownSelectCell}
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
};;

export default Cell;
