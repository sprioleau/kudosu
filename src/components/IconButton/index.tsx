import React from "react";

interface IProps {
  icon: React.ReactNode;
  onClick?: () => void;
}

export default function IconButton({ icon, onClick }: IProps) {
  return (
    <button
      className="icon-button"
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
