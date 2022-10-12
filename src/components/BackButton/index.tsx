import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import IconButton from "../IconButton";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={<RiArrowLeftSLine />}
      onClick={() => navigate(-1)}
    />
  );
}
