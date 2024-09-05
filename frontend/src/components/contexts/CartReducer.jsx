import React, { act } from "react";


export const totalPrice = (data) => {
  return data.reduce((total, item) => 
    (parseFloat(total) + parseFloat(item.price)), 0);
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
      return [...state, action.item];
    case "Remove":
      return state.filter((p) => p.id !== action.id);
    case "IncreaseQuantity":
      // eslint-disable-next-line no-case-declarations
      const IndexIncrease = state.findIndex((p) => p.id === action.id);
      state[IndexIncrease].quantity += 1;
      return [...state];
    case "DecreaseQuantity":
      // eslint-disable-next-line no-case-declarations
      const IndexDecrease = state.findIndex((p) => p.id === action.id);
      state[IndexDecrease].quantity -= 1;
      return [...state];
    default:
      state;
  }
  return <div>CartReducer</div>;
};

export default CartReducer;
