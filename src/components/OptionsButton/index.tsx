import { FiMoreVertical } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton";

export default function OptionsButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={<FiMoreVertical />}
      onClick={() => navigate("/options")}
    />
  );
}
