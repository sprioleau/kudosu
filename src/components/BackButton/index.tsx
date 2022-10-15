import { useEffect } from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components";

export default function BackButton() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoBack = (e: KeyboardEvent) => {
      if (e.key !== "b") return;
      navigate(-1);
    };

    window.addEventListener("keydown", handleGoBack);
    return () => window.removeEventListener("keydown", handleGoBack);
  }, []);

  return (
    <IconButton
      icon={<RiArrowLeftSLine />}
      onClick={() => navigate(-1)}
    />
  );
}
