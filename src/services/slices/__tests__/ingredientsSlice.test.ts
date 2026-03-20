import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import type { TIngredient } from '../../../utils/types';

describe('ingredientsSlice reducer (async)', () => {
  it('sets isLoading=true on fetchIngredients.pending', () => {
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const pendingState = ingredientsReducer(initialState, {
      type: fetchIngredients.pending.type
    });

    expect(pendingState.isLoading).toBe(true);
    expect(pendingState.error).toBeNull();
  });

  it('stores ingredients data and sets isLoading=false on fetchIngredients.fulfilled', () => {
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const mockIngredients: TIngredient[] = [
      {
        _id: 'ing-1',
        name: 'Тестовая булка',
        type: 'bun',
        proteins: 10,
        fat: 12,
        carbohydrates: 14,
        calories: 150,
        price: 120,
        image:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
        image_large:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
        image_mobile:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />'
      },
      {
        _id: 'ing-2',
        name: 'Тестовая начинка',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 50,
        price: 80,
        image:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
        image_large:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
        image_mobile:
          'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />'
      }
    ];

    const fulfilledState = ingredientsReducer(initialState, {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    } as any);

    expect(fulfilledState.isLoading).toBe(false);
    expect(fulfilledState.error).toBeNull();
    expect(fulfilledState.list).toEqual(mockIngredients);
  });

  it('stores error and sets isLoading=false on fetchIngredients.rejected', () => {
    const initialState = ingredientsReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const rejectedState = ingredientsReducer(initialState, {
      type: fetchIngredients.rejected.type,
      payload: 'Network error'
    } as any);

    expect(rejectedState.isLoading).toBe(false);
    expect(rejectedState.list).toEqual([]);
    expect(rejectedState.error).toBe('Network error');
  });
});
