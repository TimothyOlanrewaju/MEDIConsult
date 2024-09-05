import { createContext, useReducer } from "react";
import CartReducer from "./CartReducer";

export const CartContext = createContext();
const CartContextProvider = ({ children }) => {
  const [data, dispatch] = useReducer(CartReducer, []);
  return (
    <CartContext.Provider value={{ data, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
