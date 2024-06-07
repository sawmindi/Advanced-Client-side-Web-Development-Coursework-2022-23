import React, { createContext, useContext, useReducer } from 'react';

const initialState = { favorites: [] }; // Initialize as empty array

const favoriteReducer = (state, action) => { /*Declaring favoriteReducer*/
  switch (action.type) { /*Declaring switch*/
    case 'ADD_TO_FAVORITES': /*Declaring case*/
      return { favorites: [...state.favorites, action.payload] };/*Returning favorites*/
    case 'REMOVE_FROM_FAVORITES':/*Declaring case*/
      return { 
        favorites: state.favorites.filter(item => item.id !== action.payload.id),
      };/*Returning favorites*/
    default:
      return state; 
  }
};

const FavoriteContext = createContext(); /*Declaring FavoriteContext*/

export const FavoriteProvider = ({ children }) => { /*Declaring FavoriteProvider*/
  const [state, dispatch] = useReducer(favoriteReducer, initialState);/*Declaring state and dispatch*/

  return (
    <FavoriteContext.Provider value={{ state, dispatch }}> 
      {children}
    </FavoriteContext.Provider> 
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext); 
  if (!context) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  } 
  return context; 
};
