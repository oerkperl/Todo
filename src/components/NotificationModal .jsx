import React, { useState, useEffect } from "react";
import { ModalContainer } from "./Styled";

const NotificationModal = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return isVisible ? <ModalContainer>{message}</ModalContainer> : null;
};

export default NotificationModal;
