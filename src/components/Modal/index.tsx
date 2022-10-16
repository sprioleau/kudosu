import useGameStore from "@/store";
import FocusTrap from "focus-trap-react";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

export default function Modal({ children, isVisible, onClose }: IProps) {
  const result = useGameStore((s) => s.result);
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    if (result) navigate("/");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (!isVisible) return null;

  return createPortal(
    <FocusTrap>
      <div
        className="modal"
        onClick={handleClose}
      >
        <div
          className="modal__content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <button
            className="modal__close-button"
            onClick={handleClose}
          >
            &times;
          </button>
        </div>
      </div>
    </FocusTrap>,
    document.getElementById("modal") as HTMLElement,
  );
}
