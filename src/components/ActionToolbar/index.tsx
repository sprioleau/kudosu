import useGameStore from "@/store";

import { BsEraser } from "react-icons/bs";
import { AiOutlineUndo } from "react-icons/ai";
import NotesIcon from "../NotesIcon";
import HintIcon from "../HintIcon";

export enum EAction {
  Undo = "Undo",
  Erase = "Erase",
  Notes = "Notes",
  Hint = "Hint",
}

export interface IAction {
  label: EAction;
  icon: JSX.Element;
}

const availableActions: IAction[] = [
  {
    label: EAction.Undo,
    icon: <AiOutlineUndo />,
  },
  {
    label: EAction.Erase,
    icon: <BsEraser />,
  },
  {
    label: EAction.Notes,
    icon: <NotesIcon />,
  },
  {
    label: EAction.Hint,
    icon: <HintIcon />,
  },
];

const ActionToolbar = () => {
  const selectAction = useGameStore((s) => s.selectAction);
  const hintsRemaining = useGameStore((s) => s.hintsRemaining);
  const previousMoves = useGameStore((s) => s.previousMoves);

  const handleActionSelect = (action: EAction) => {
    selectAction(action);
  };

  const getIsDisabled = (label: string): boolean => {
    if (label === EAction.Undo) return previousMoves.length === 0;
    if (label === EAction.Hint) return hintsRemaining === 0;
    return false;
  };

  return (
    <div className="action-toolbar">
      <ul className="action-toolbar__options">
        {availableActions.map((action: IAction) => {
          const { label, icon } = action;

          return (
            <li
              key={label}
              className="action-toolbar__option"
            >
              <button
                className="action-toolbar__button"
                onClick={() => handleActionSelect(label)}
                disabled={getIsDisabled(label)}
              >
                <span className="action-toolbar__icon">{icon}</span>
                <span className="action-toolbar__label">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActionToolbar;
