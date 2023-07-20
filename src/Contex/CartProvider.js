import React, { useReducer } from "react";
import CartContex from "./Cart-Contex";
const initialItems = {
    state: false,
  };

const reducer = (state, action) => { 
  if(action.type === "TOGGLE"){
        return {
          ...initialItems,
          state: !state
        }
  }
};

  


export default function CartProvider(props) {
  const [cartState, dispatch] = useReducer(reducer,initialItems);

  function toggleCart() {
    dispatch({ type: "TOGGLE"});
  }

  const cartContext = {
    state: cartState.state, 
    toggle: toggleCart,
  };

  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
}
