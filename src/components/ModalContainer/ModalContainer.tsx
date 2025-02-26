import { useCallback, useEffect } from 'react';
import clsx from 'clsx';
import css from './ModalContainer.module.css';

interface ModalProps {
    onClose: () => void;
    isTransparent?: boolean;
    children: React.ReactNode;
    // children: React.ReactNode; - щоб підтримувати будь-який JSX.Element
};

const ModalContainer = ({ onClose, isTransparent = false, children }: ModalProps): JSX.Element => {
   const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      onClose();
    }
  }, [onClose]);

    useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.documentElement.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = 'visible';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    const classes = clsx(css.overlay, isTransparent ? css.transparent : css.black);
    
  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      {children}
    </div>
  );
};

export default ModalContainer;