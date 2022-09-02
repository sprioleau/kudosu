import useStore from "@/store";

import { BsLightbulb, BsEraser, BsPencil, BsPencilFill } from "react-icons/bs";
import { AiOutlineUndo } from "react-icons/ai";

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
  iconAlt: JSX.Element | undefined;
}

const availableActions: Action[] = [
  {
    id: ACTION_IDS.UNDO,
    label: "Undo",
    icon: <AiOutlineUndo />,
    iconAlt: undefined,
  },
  {
    id: ACTION_IDS.ERASE,
    label: "Erase",
    icon: <BsEraser />,
    iconAlt: undefined,
  },
  {
    id: ACTION_IDS.NOTES,
    label: "Notes",
    icon: <BsPencil />,
    iconAlt: <BsPencilFill />,
  },
  {
    id: ACTION_IDS.HINT,
    label: "Hint",
    icon: <BsLightbulb />,
    iconAlt: undefined,
  },
];

const ActionToolbar = () => {
  const selectAction = useStore((s) => s.selectAction);
  const notesModeActive = useStore((s) => s.notesModeActive);

  const handleActionSelect = (action: Action) => {
    selectAction(action);
  };

  return (
    <div className="action-toolbar">
      <ul className="action-toolbar__options">
        {availableActions.map((action: Action) => {
          const { id, label, icon, iconAlt } = action;

          return (
            <li
              key={id}
              className="action-toolbar__option"
            >
              <button
                id={id}
                className="action-toolbar__button"
                onClick={() => handleActionSelect(action)}
              >
                <span className="action-toolbar__icon">
                  {id === ACTION_IDS.NOTES && notesModeActive ? iconAlt : icon}
                </span>
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
