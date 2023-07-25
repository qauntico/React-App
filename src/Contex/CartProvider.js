import React, { useReducer } from "react";
import CartContex from "./Cart-Contex";
const initialItems = {
    state: false,
    showProfile:false,
    userProfileInfo: {}
  };

const reducer = (state, action) => { 
  if(action.type === "TOGGLE"){
        return {
          ...state,
          state: !state.state
        }
  }else if(action.type == 'USERPROFILE'){
    const member = action.user;
    console.log(member)
    return {
      ...state,
      showProfile: true,
      userProfileInfo: member
    }
  }else if(action.type == 'HIDEUSERPROFILE'){
    return {
      ...state,
      userProfileInfo: {},
      showProfile: !state.showProfile
    }
  }
};

  


export default function CartProvider(props) {
  const [cartState, dispatch] = useReducer(reducer,initialItems);

  function ToggleCart() {
    dispatch({ type: "TOGGLE"});
  }

  function UpdateUserProfile(user) {
    dispatch({type: 'USERPROFILE', user: user})
  }

  function UnShowUserProfile(){
    dispatch({type: 'HIDEUSERPROFILE'})
  }

  const cartContext = {
    state: cartState.state, 
    showProfile: cartState.showProfile,
    toggle: ToggleCart,
    profileState: cartState.userProfileInfo,
    UpdateProfile: UpdateUserProfile,
    HideUserProfile: UnShowUserProfile
  };

  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
}
