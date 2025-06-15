import { FC } from 'react';
import styles from './ingredients-details-page.module.css';

interface IngredientDetailsPageUIProps {
  children: React.ReactNode;
  title: string;
}

export const IngredientDetailsPageUI: FC<IngredientDetailsPageUIProps> = ({
  children,
  title
}) => (
  <div className={styles.wrapper}>
    <h3 className={`${styles.title} text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);
