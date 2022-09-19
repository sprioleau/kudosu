import { createPortal } from "react-dom";
import useStore from "@/store";
import FocusTrap from "focus-trap-react";
import React from "react";

export default function Modal() {
  const modalContent = useStore((s) => s.modalContent);

  if (!modalContent) return null;

  return createPortal(
    <div className="modal">
      <FocusTrap>
        <div className="modal__content">{modalContent}</div>
      </FocusTrap>
    </div>,
    document.getElementById("modal") as HTMLElement,
  );
}
