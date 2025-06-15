import { FC } from 'react';
import { IngredientsDetailsProps } from './type';
import { IngredientDetailsPageUI } from '../ui/ingredients-details-page';

export const IngredientsDetailsPage: FC<IngredientsDetailsProps> = ({
  children
}) => (
  <IngredientDetailsPageUI title={'Детали ингредиента'}>
    {children}
  </IngredientDetailsPageUI>
);
