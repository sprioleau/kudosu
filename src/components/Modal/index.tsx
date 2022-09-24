import { createPortal } from "react-dom";
import useStore from "@/store";
import FocusTrap from "focus-trap-react";

export default function Modal() {
  const modalContent = useStore((s) => s.modalContent);
  const updateModalContent = useStore((s) => s.updateModalContent);

  if (!modalContent) return null;

  const handleClose = () => updateModalContent();

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
