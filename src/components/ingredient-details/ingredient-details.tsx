import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredients,
  selectIngredientsIsLoading
} from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsIsLoading);

  useEffect(() => {
    if (!ingredients.length && !isLoading) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length, isLoading]);

  const ingredientData = useMemo(
    () => ingredients.find((item) => item._id === id) ?? null,
    [ingredients, id]
  );

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return null;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
