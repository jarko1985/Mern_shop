import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
      break;
    case REMOVE_FROM_CART:
      return state.filter((item) => item !== action.payload);
      break;
    case CLEAR_CART:
      return (state = []);
      break;
  }

  return state;
};

export default cartReducer;
