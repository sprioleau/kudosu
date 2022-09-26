import { createPortal } from "react-dom";
import useStore from "@/store";
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";

export default function Modal() {
  const modalContent = useStore((s) => s.modalContent);
  const updateModalContent = useStore((s) => s.updateModalContent);
  const resumeGame = useStore((s) => s.resumeGame);
  const timerIsRunning = useStore((s) => s.timerIsRunning);

  const handleClose = () => {
    if (!timerIsRunning) return resumeGame();
    updateModalContent();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  if (!modalContent) return null;

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
          {modalContent}
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
