import useStore from "@/store";

import { BsEraser } from "react-icons/bs";
import { AiOutlineUndo } from "react-icons/ai";
import NotesIcon from "../NotesIcon";
import HintIcon from "../HintIcon";

export enum EAction {
  Undo = "undo",
  Erase = "erase",
  Notes = "notes",
  Hint = "hint",
}

export interface IAction {
  id: string;
  label: string;
  icon: JSX.Element;
}

const availableActions: IAction[] = [
  {
    id: EAction.Undo,
    label: "Undo",
    icon: <AiOutlineUndo />,
  },
  {
    id: EAction.Erase,
    label: "Erase",
    icon: <BsEraser />,
  },
  {
    id: EAction.Notes,
    label: "Notes",
    icon: <NotesIcon />,
  },
  {
    id: EAction.Hint,
    label: "Hint",
    icon: <HintIcon />,
  },
];

const ActionToolbar = () => {
  const selectAction = useStore((s) => s.selectAction);
  const hintsRemaining = useStore((s) => s.hintsRemaining);
  const previousMoves = useStore((s) => s.previousMoves);

  const handleActionSelect = (action: IAction) => {
    selectAction(action);
  };

  const getIsDisabled = (id: string): boolean => {
    if (id === EAction.Undo) return previousMoves.length === 0;
    if (id === EAction.Hint) return hintsRemaining === 0;
    return false;
  };

  return (
    <div className="action-toolbar">
      <ul className="action-toolbar__options">
        {availableActions.map((action: IAction) => {
          const { id, label, icon } = action;

          return (
            <li
              key={id}
              className="action-toolbar__option"
            >
              <button
                id={id}
                className="action-toolbar__button"
                onClick={() => handleActionSelect(action)}
                disabled={getIsDisabled(id)}
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
