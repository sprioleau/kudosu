import { createPortal } from "react-dom";
import useStore from "@/store";
import FocusTrap from "focus-trap-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal() {
  const result = useStore((s) => s.result);
  const modalContent = useStore((s) => s.modalContent);
  const modalOnDismiss = useStore((s) => s.modalOnDismiss);
  const updateModalContent = useStore((s) => s.updateModalContent);
  const navigate = useNavigate();

  const handleClose = () => {
    if (modalOnDismiss) return modalOnDismiss();
    if (result) navigate("/");
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
