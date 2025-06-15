import { FC } from 'react';
import styles from './order-page.module.css';

interface OrderPageUIProps {
  children: React.ReactNode;
  title: number | undefined;
}

export const OrderPageUI: FC<OrderPageUIProps> = ({ children, title }) => (
  <div className={styles.wrapper}>
    {title && (
      <h3
        className={`${styles.title} text text_type_main-large`}
      >{`#${String(title).padStart(6, '0')}`}</h3>
    )}
    {children}
  </div>
);
