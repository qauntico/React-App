import React, { useReducer } from "react";
import CartContex from "./Cart-Contex";
const initialItems = {
    state: false,
    showProfile:false,
    showAdminDashboard:true,
    createCategory:false,
    viewCategories: false,
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
    return {
      ...state,
      showProfile: true,
      showAdminDashboard: false,
      createEvent:false,
      userProfileInfo: member
    }
  }else if(action.type == 'HIDEUSERPROFILE'){
    return {
      ...state,
      userProfileInfo: {},
      showProfile: !state.showProfile,
      showAdminDashboard:true
    }
  }else if(action.type == 'CREATECATEGORY'){
      return {
        ...state,
        createCategory:true,
        viewCategories: false,
        showAdminDashboard: false,
      }

  }else if(action.type == 'ADMINDASHBOARD'){
    return {
      ...state,
      createCategory:false,
      viewCategories: false,
      showAdminDashboard: true,
    }
  }else if(action.type == 'VIEWCATEGORIES'){
    return {
      ...state,
      createCategory:false,
      viewCategories: true,
      showAdminDashboard: false,
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

  function CreateCategoryDashboard(){
    console.log('yes')
    dispatch({type: 'CREATECATEGORY'})
  }

  function AdminDashboard(){
    dispatch({type: 'ADMINDASHBOARD'})
  }

  function ViewCategoriesDashboard(){
    dispatch({type: 'VIEWCATEGORIES'})
  }

  const cartContext = {
    state: cartState.state, 
    showProfile: cartState.showProfile,
    showAdminDashboard: cartState.showAdminDashboard,
    showCreateEvent: cartState.createCategory,
    showViewCategories: cartState.viewCategories,
    toggle: ToggleCart,
    profileState: cartState.userProfileInfo,
    UpdateProfile: UpdateUserProfile,
    HideUserProfile: UnShowUserProfile,
    ToggleAdminDashboard: AdminDashboard,
    ToggleCreateCategory: CreateCategoryDashboard,
    ToggleViewCategories: ViewCategoriesDashboard
  };

  return (
    <CartContex.Provider value={cartContext}>
      {props.children}
    </CartContex.Provider>
  );
}
