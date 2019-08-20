import React from 'react';

export const Store = React.createContext();

const initialState = {
  hourlyRate: '',
  expenses: [],
  incomeCalculationType: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_HOURLY_RATE':
      return { ...state, hourlyRate: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: [...action.payload] };
    case 'SET_INCOME_CALCULATION_TYPE':
      return { ...state, incomeCalculationType: action.payload };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = {
    state,
    dispatch,
  };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
