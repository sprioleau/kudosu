import { RiSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton";

export default function SettingsButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={<RiSettingsLine />}
      onClick={() => navigate("/settings")}
    />
  );
}
