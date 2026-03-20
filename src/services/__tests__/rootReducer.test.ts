import rootReducer from '../rootReducer';

import ingredientsReducer from '../slices/ingredientsSlice';
import userReducer from '../slices/userSlice';
import constructorReducer from '../slices/constructorSlice';
import orderReducer from '../slices/orderSlice';
import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import profileReducer from '../slices/profileSlice';

describe('rootReducer initialization', () => {
  it('returns correct initial store state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const expected = {
      ingredients: ingredientsReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction),
      burgerConstructor: constructorReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      feed: feedReducer(undefined, unknownAction),
      profileOrders: profileOrdersReducer(undefined, unknownAction),
      profile: profileReducer(undefined, unknownAction)
    };

    const actual = rootReducer(undefined, unknownAction);

    expect(actual).toEqual(expected);
  });
});
