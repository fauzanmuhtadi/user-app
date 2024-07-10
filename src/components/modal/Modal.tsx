import React from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-modal-overlay">
      <div className="popup-modal-content">{children}</div>
    </div>
  );
};

export default Modal;
