import { FC, memo, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

// Контейнер для модальных окон в DOM
const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  // Обработчик нажатия клавиши Escape
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Добавляем и удаляем обработчик нажатия клавиши Escape
  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    // Очистка при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  // Создаем портал для отображения модального окна
  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
