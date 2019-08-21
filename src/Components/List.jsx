import React, { useState, useEffect } from 'react';
import './List.css';
import { Rectangle } from 'react-shapes';
import CurrencyInput from 'react-currency-input';
import { Store } from '../Store';

function List() {
  const [expenses, setExpenses] = useState([
    {
      expenseName: 'Rent',
      expenseAmount: 500.00,
      expenseColor: '#ff0800',
    },
  ]);

  const { dispatch } = React.useContext(Store);

  const COLOR_ARRAY = [
    '#FF6633',
    '#FFB399',
    '#FF33FF',
    '#FFFF99',
    '#00B3E6',
    '#E6B333',
    '#3366E6',
    '#999966',
    '#99FF99',
    '#B34D4D',
    '#80B300',
    '#809900',
    '#E6B3B3',
    '#6680B3',
    '#66991A',
    '#FF99E6',
    '#CCFF1A',
    '#FF1A66',
    '#E6331A',
    '#33FFCC',
    '#66994D',
    '#B366CC',
    '#4D8000',
    '#B33300',
    '#CC80CC',
    '#66664D',
    '#991AFF',
    '#E666FF',
    '#4DB3FF',
    '#1AB399',
    '#E666B3',
    '#33991A',
    '#CC9999',
    '#B3B31A',
    '#00E680',
    '#4D8066',
    '#809980',
    '#E6FF80',
    '#1AFF33',
    '#999933',
    '#FF3380',
    '#CCCC00',
    '#66E64D',
    '#4D80CC',
    '#9900B3',
    '#E64D66',
    '#4DB380',
    '#FF4D4D',
    '#99E6E6',
    '#6666FF',
  ];

  // reducer that returns the last expense based on each expense's index position in COLOR_ARRAY
  const lastExpenseObjectBasedOnPositionInColorArray = expenses.reduce((prev, current) => (COLOR_ARRAY.indexOf(prev.expenseColor) > COLOR_ARRAY.indexOf(current.expenseColor)) ? prev : current, COLOR_ARRAY[0])
  
  const addNewExpenseEntry = (e) => {
    const newExpenses = [...expenses];    
    const nextColor = COLOR_ARRAY[COLOR_ARRAY.indexOf(lastExpenseObjectBasedOnPositionInColorArray.expenseColor) + 1]

    if(nextColor === undefined){
      window.alert("You seem to have more expenses our site can handle. From now on your additional expenses will not be tracked.");
    }

    newExpenses.push({
      expenseName: '',
      expenseAmount: 0,
      expenseColor: nextColor
    });
    setExpenses(newExpenses);
    setTimeout(() => {
      const expenseInputs = document.querySelectorAll('.expense-input');
      expenseInputs[expenseInputs.length - 1].focus();
    }, 0);
  };

  const updateExpenseAmountAtIndex = (e, valueString, valueFloat) => {
    const newExpenses = [...expenses];
    const { index } = e.target.dataset;
    newExpenses[index].expenseAmount = valueFloat;
    setExpenses(newExpenses);
  };

  const handleKeyDownForExpenseAmount = (e) => {
    const keyboard = e.key;
    const { index } = e.target.dataset;
    if (keyboard === 'Enter') {
      addNewExpenseEntry(e);
    }
    if (keyboard === 'Backspace' && expenses[index].expenseAmount === 0.00 && index !== '0') {
      return removeExpensesAtIndex(index);
    }
    return null;
  };

  function updateExpenseNameAtIndex(e, i) {
    const newExpenses = [...expenses];
    newExpenses[i].expenseName = e.target.value;
    setExpenses(newExpenses);
  }

  function handleKeyDownForExpenseName(e, i) {
    if (e.key === 'Enter') {
      e.target.nextSibling.focus();
      e.preventDefault();
    }
    if (e.key === 'Backspace' && expenses[i].expenseName === '') {
      e.preventDefault();
      return removeExpensesAtIndex(i);
    }
  }

  function removeExpensesAtIndex(i) {
    let j = parseInt(i);
    if (j === 0 && expenses.length === j) return;

    setExpenses([...expenses.filter(function(val, index) { return index !== j })]);

    setTimeout(() => {
      document.forms[0].elements[2 * i - 1].focus();
    }, 0);
  }

  // eslint-disable-next-line
    function toggleExpenseCompleteAtIndex(index) {
    const temporaryExpenses = [...expenses];
    temporaryExpenses[index].isCompleted = !temporaryExpenses[index]
      .isCompleted;
    setExpenses(temporaryExpenses);
  }

  useEffect(() => {
    dispatch({
      type: 'SET_EXPENSES',
      payload: expenses,
    });
  }, [dispatch, expenses]);

  return (
    <form className="expense-list">
      <ul>
        {expenses.map((expense, index) => (
          <div key={index} id={index} className="expense">
            <Rectangle
              fill={{ color: expense.expenseColor }}
              height={20}
              width={40}
            />
            <input
              className="expense-input"
              onChange={e => updateExpenseNameAtIndex(e, index)}
              onKeyDown={e => handleKeyDownForExpenseName(e, index)}
              placeholder="Expense"
              type="text"
              value={expense.expenseName}
            />
            <CurrencyInput
              className="currency-input"
              data-index={index}
              onChangeEvent={updateExpenseAmountAtIndex}
              onKeyDown={handleKeyDownForExpenseAmount}
              value={expense.expenseAmount}
            />
          </div>
        ))}
      </ul>
    </form>
  );
}

export default List;
