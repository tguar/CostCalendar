import React from 'react';
import { getCachedItemOrDefault } from './Components/LocalStorageCache.jsx';
import { setCachedItem } from './Components/LocalStorageCache.jsx';

export const Store = React.createContext();

const initialState = getCachedItemOrDefault(
  {
    hourlyRate: '20',
    expenses: [],
    incomeCalculationType: 0,
    weekendDisabled: true,
  },
  'Income'
);

function reducer(state, action) {
  var newState;
  switch (action.type) {
    case 'SET_HOURLY_RATE':
      newState = { ...state, hourlyRate: action.payload };
      setCachedItem(newState, 'Income');
      return newState;
    case 'SET_EXPENSES':
      newState = { ...state, expenses: [...action.payload] };
      setCachedItem(newState, 'Income');
      return newState;
    case 'SET_INCOME_CALCULATION_TYPE':
      newState = { ...state, incomeCalculationType: action.payload };
      setCachedItem(newState, 'Income');
      return newState;
    case 'SET_DISABLE_WEEKEND':
      newState = { ...state, weekendDisabled: action.payload };
      setCachedItem(newState, 'Income');
      return newState;
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
