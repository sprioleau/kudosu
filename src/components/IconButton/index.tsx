import React from "react";

interface IProps {
  icon: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function IconButton({ icon, onClick, disabled }: IProps) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
}
