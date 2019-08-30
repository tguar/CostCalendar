import React, { useState, useEffect } from "react";
import "./List.css";
import styled from "styled-components";
import { Rectangle } from "react-shapes";
import Cleave from "cleave.js/react";
import { removeCommasFromString } from "../helpers";
import { Store } from "../Store";
import { getCachedItemOrDefault } from "./LocalStorageCache.jsx";
import { setCachedItem } from "./LocalStorageCache";

const CurrencyInput = styled(Cleave)`
  text-align: right;
`;

function List() {
  const [expenses, setExpenses] = useState(
    getCachedItemOrDefault(
      [
        {
          expenseName: "Rent",
          expenseAmount: Number(900).toFixed(2),
          expenseColor: "#ff0800"
        }
      ],
      "Expenses"
    )
  );

  const { dispatch } = React.useContext(Store);

  const COLOR_ARRAY = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
    "#33FFCC",
    "#66994D",
    "#B366CC",
    "#4D8000",
    "#B33300",
    "#CC80CC",
    "#66664D",
    "#991AFF",
    "#E666FF",
    "#4DB3FF",
    "#1AB399",
    "#E666B3",
    "#33991A",
    "#CC9999",
    "#B3B31A",
    "#00E680",
    "#4D8066",
    "#809980",
    "#E6FF80",
    "#1AFF33",
    "#999933",
    "#FF3380",
    "#CCCC00",
    "#66E64D",
    "#4D80CC",
    "#9900B3",
    "#E64D66",
    "#4DB380",
    "#FF4D4D",
    "#99E6E6",
    "#6666FF"
  ];

  // reducer that returns the last expense based on each expense's index position in COLOR_ARRAY
  const lastExpenseObjectBasedOnPositionInColorArray = expenses.reduce(
    (prev, current) =>
      COLOR_ARRAY.indexOf(prev.expenseColor) >
      COLOR_ARRAY.indexOf(current.expenseColor)
        ? prev
        : current,
    COLOR_ARRAY[0]
  );

  function handleKeyDownForExpenseName(e, i) {
    if (e.key === "Enter") {
      e.target.nextSibling.focus();
      e.preventDefault();
    }
    if (e.key === "Backspace" && expenses[i].expenseName === "") {
      e.preventDefault();
      return removeExpensesAtIndex(i);
    }
  }

  function handleKeyDownForExpenseAmount(e, i) {
    if (e.key === "Enter") {
      let { value } = e.target;
      const removedCommaValue = removeCommasFromString(value);
      const newExpenses = [...expenses];
      newExpenses[i].expenseAmount = Number(removedCommaValue).toFixed(2);
      setExpenses(newExpenses);

      createExpenseAtIndex(e, i);
    }
    if (e.key === "Backspace" && expenses[i].expenseAmount === 0) {
      e.preventDefault();
      return removeExpensesAtIndex(i);
    }
    if (e.key === "Backspace" && expenses[i].expenseAmount === "") {
      e.preventDefault();
      return removeExpensesAtIndex(i);
    }
  }

  function createExpenseAtIndex(e, i) {
    const nextColor =
      COLOR_ARRAY[
        COLOR_ARRAY.indexOf(
          lastExpenseObjectBasedOnPositionInColorArray.expenseColor
        ) + 1
      ];

    if (nextColor === undefined) {
      window.alert(
        "You seem to have more expenses our site can handle. From now on your additional expenses will not be tracked."
      );
    }

    const newExpenses = [...expenses];
    newExpenses.splice(i + 1, 0, {
      expenseName: "",
      expenseAmount: "",
      expenseColor: nextColor
    });
    setExpenses(newExpenses);
    setTimeout(() => {
      document.forms[0].elements[2 * i + 2].focus();
    }, 0);
    setCachedItem(newExpenses, "Expenses");
  }

  function updateExpenseNameAtIndex(e, i) {
    const newExpenses = [...expenses];
    newExpenses[i].expenseName = e.target.value;
    setExpenses(newExpenses);
    setCachedItem(newExpenses, "Expenses");
  }

  function updateExpenseAmountAtIndex(e, i) {
    const { value } = e.target;

    const newExpenses = [...expenses];
    newExpenses[i].expenseAmount = value;
    setExpenses(newExpenses);
    setCachedItem(newExpenses, "Expenses");
  }

  function removeExpensesAtIndex(i) {
    if (i === 0 && expenses.length === 1) return;
    setExpenses(expenses =>
      expenses.slice(0, i).concat(expenses.slice(i + 1, expenses.length))
    );
    setTimeout(() => {
      document.forms[0].elements[2 * i - 1].focus();
    }, 0);
    removeCachedExpensesAtIndex(i);
  }

  function removeCachedExpensesAtIndex(i) {
    var retarr = JSON.parse(localStorage.getItem("cacheExpenses"));
    retarr.splice(i, 1);
    setCachedItem(retarr);
  }

  useEffect(() => {
    dispatch({
      type: "SET_EXPENSES",
      payload: expenses
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
            {/* <input
              className="currency-input"
              min="0.00"
              max="9999.99"
              step=".01"
              value={expense.expenseAmount}
              onKeyDown={e => handleKeyDownForExpenseAmount(e, index)}
              onChange={e => updateExpenseAmountAtIndex(e, index)}
              type="number"
            /> */}
            <CurrencyInput
              onChange={e => updateExpenseAmountAtIndex(e, index)}
              onKeyDown={e => handleKeyDownForExpenseAmount(e, index)}
              options={{
                numeral: true,
                numeralThousandsGroupStyle: "thousand",
                numeralPositiveOnly: true
              }}
              placeholder="0.00"
              value={expense.expenseAmount}
            />
          </div>
        ))}
      </ul>
    </form>
  );
}

export default List;
