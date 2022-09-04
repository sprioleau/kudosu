import useStore from "@/store";

import { BsEraser } from "react-icons/bs";
import { AiOutlineUndo } from "react-icons/ai";
import NotesIcon from "../NotesIcon";
import HintIcon from "../HintIcon";

export const ACTION_IDS = {
  UNDO: "undo",
  ERASE: "erase",
  NOTES: "notes",
  HINT: "hint",
};

export interface Action {
  id: string;
  label: string;
  icon: JSX.Element;
}

const availableActions: Action[] = [
  {
    id: ACTION_IDS.UNDO,
    label: "Undo",
    icon: <AiOutlineUndo />,
  },
  {
    id: ACTION_IDS.ERASE,
    label: "Erase",
    icon: <BsEraser />,
  },
  {
    id: ACTION_IDS.NOTES,
    label: "Notes",
    icon: <NotesIcon />,
  },
  {
    id: ACTION_IDS.HINT,
    label: "Hint",
    icon: <HintIcon />,
  },
];

const ActionToolbar = () => {
  const selectAction = useStore((s) => s.selectAction);
  const hintsRemaining = useStore((s) => s.hintsRemaining);

  const handleActionSelect = (action: Action) => {
    selectAction(action);
  };

  const getIsDisabled = (id: string): boolean => {
    if (![ACTION_IDS.HINT, ACTION_IDS.UNDO].includes(id)) return false;
    if (id === ACTION_IDS.HINT) return hintsRemaining === 0;
    return false;
  };

  return (
    <div className="action-toolbar">
      <ul className="action-toolbar__options">
        {availableActions.map((action: Action) => {
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
