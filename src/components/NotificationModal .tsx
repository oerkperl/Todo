
import React, { useState, useEffect } from 'react';
import { ModalContainer } from './Styled'; 

interface NotificationModalProps {
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return isVisible ? <ModalContainer>{message}</ModalContainer> : null;
};

export default NotificationModal;
