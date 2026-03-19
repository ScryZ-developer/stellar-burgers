import { TIngredient } from '@utils-types';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  handleAdd: () => void;
  detailsPath: string;
  locationState?: unknown;
};
