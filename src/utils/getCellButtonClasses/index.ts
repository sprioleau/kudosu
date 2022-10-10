import { IPuzzleCell } from "@/utils/getBoard";
import { getIsTruthyEqual } from "@/utils";

export default function getCellButtonClasses({
  cell,
  selectedCell,
}: {
  cell: IPuzzleCell;
  selectedCell: IPuzzleCell | undefined;
}) {
  let buttonClasses = "cell__button";

  if (!selectedCell) return buttonClasses;

  const isSelected =
    getIsTruthyEqual(cell.row, selectedCell.row) &&
    getIsTruthyEqual(cell.col, selectedCell.col);

  if (isSelected) buttonClasses += " selected";

  if (cell.isCorrect) {
    buttonClasses += " correct";
  } else if (cell.value && !cell.isCorrect && !cell.isGiven) {
    buttonClasses += " incorrect";
  }

  return buttonClasses;
}
