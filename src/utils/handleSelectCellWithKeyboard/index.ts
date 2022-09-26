import { TDirection } from "@/store";
import { IPuzzleCell } from "@/utils/getBoard";

export default function handleSelectWithKeyboard(
  e: React.KeyboardEvent<HTMLButtonElement>,
  {
    selectedCell,
    navigateToNextCell,
    selectNumberOption,
  }: {
    selectedCell: IPuzzleCell | undefined;
    navigateToNextCell: (direction: TDirection) => void;
    selectNumberOption: (value: number) => void;
  },
) {
  if ([" ", "Enter"].includes(e.key)) e.preventDefault();

  const validNumberKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  const tabKey = "Tab";
  const validKeys = [...validNumberKeys, ...arrowKeys, tabKey];

  const key = e.key;

  if (!selectedCell) return;
  if (!validKeys.includes(key)) return;
  if (validNumberKeys.includes(key)) selectNumberOption(Number(key));
  if (arrowKeys.includes(key)) {
    const direction = key.replace("Arrow", "") as TDirection;
    navigateToNextCell(direction);
  }
  if (tabKey === key) {
    const direction = e.shiftKey ? "Left" : "Right";
    navigateToNextCell(direction);
  }
}
