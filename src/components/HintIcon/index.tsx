import useStore from "@/store";
import { BsLightbulb } from "react-icons/bs";

const HintIcon = () => {
  const hintsRemaining = useStore((s) => s.hintsRemaining);

  return (
    <div
      className="data-icon"
      data-icon-label={hintsRemaining}
    >
      <BsLightbulb />
    </div>
  );
};

export default HintIcon;
