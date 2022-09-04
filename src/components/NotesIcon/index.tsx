import useStore from "@/store";
import { BsPencil, BsPencilFill } from "react-icons/bs";

const NotesIcon = () => {
  const notesModeActive = useStore((s) => s.notesModeActive);
  const notesLabel = notesModeActive ? "On" : "";

  return (
    <div
      className="data-icon"
      data-icon-data={notesModeActive}
      data-icon-label={notesLabel}
    >
      {notesModeActive ? <BsPencilFill /> : <BsPencil />}
    </div>
  );
};

export default NotesIcon;
