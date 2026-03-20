import constructorReducer, {
  addItem,
  removeItem,
  reorderItems,
  type ConstructorState
} from '../constructorSlice';

describe('burgerConstructor reducer', () => {
  it('handles addItem action: adds ingredient to items', () => {
    const initialState: ConstructorState = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const ingredient = {
      _id: 'ing-main-1',
      name: 'Тестовая начинка',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-1'
    };

    const nextState = constructorReducer(initialState, {
      type: addItem.type,
      payload: ingredient
    });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toMatchObject({
      _id: ingredient._id,
      name: ingredient.name,
      type: ingredient.type,
      id: ingredient.id
    });
  });

  it('handles removeItem action: removes ingredient by index', () => {
    const ingredient1 = {
      _id: 'ing-main-1',
      name: 'Тестовая начинка 1',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-1'
    };
    const ingredient2 = {
      _id: 'ing-main-2',
      name: 'Тестовая начинка 2',
      type: 'main',
      proteins: 5,
      fat: 6,
      carbohydrates: 7,
      calories: 8,
      price: 200,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-2'
    };

    const stateWithItems = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const withTwoItems = constructorReducer(stateWithItems, {
      type: addItem.type,
      payload: ingredient1
    });

    const withTwoItemsAfterAdd2 = constructorReducer(withTwoItems, {
      type: addItem.type,
      payload: ingredient2
    });

    const nextState = constructorReducer(withTwoItemsAfterAdd2, {
      type: removeItem.type,
      payload: 0
    });

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].id).toBe(ingredient2.id);
    expect(nextState.items[0].name).toBe(ingredient2.name);
  });

  it('handles reorderItems action: changes order of ingredients', () => {
    const ingredient1 = {
      _id: 'ing-main-1',
      name: 'Тестовая начинка 1',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 4,
      price: 100,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-1'
    };
    const ingredient2 = {
      _id: 'ing-main-2',
      name: 'Тестовая начинка 2',
      type: 'main',
      proteins: 5,
      fat: 6,
      carbohydrates: 7,
      calories: 8,
      price: 200,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-2'
    };
    const ingredient3 = {
      _id: 'ing-main-3',
      name: 'Тестовая начинка 3',
      type: 'main',
      proteins: 9,
      fat: 10,
      carbohydrates: 11,
      calories: 12,
      price: 300,
      image:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_large:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      image_mobile:
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" />',
      id: 'ctor-3'
    };

    const initialState = constructorReducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    const stateWithItems = constructorReducer(initialState, {
      type: addItem.type,
      payload: ingredient1
    });
    const stateWithItems2 = constructorReducer(stateWithItems, {
      type: addItem.type,
      payload: ingredient2
    });
    const stateWithItems3 = constructorReducer(stateWithItems2, {
      type: addItem.type,
      payload: ingredient3
    });

    const nextState = constructorReducer(stateWithItems3, {
      type: reorderItems.type,
      payload: { from: 0, to: 2 }
    });

    expect(nextState.items.map((i) => i.id)).toEqual([
      ingredient2.id,
      ingredient3.id,
      ingredient1.id
    ]);
  });
});
