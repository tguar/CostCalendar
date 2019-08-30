import React, { useState, useEffect } from "react";
import "./List.css";
import { getCachedExpensesOrDefault } from "./LocalStorageCache.jsx";
import { cacheExpenses } from "./LocalStorageCache";
import { Rectangle } from "react-shapes";
import { Store } from "../Store";

function List() {
  const [expenses, setExpenses] = useState(
    getCachedExpensesOrDefault([
      {
        expenseName: "Rent",
        expenseAmount: "400",
        expenseColor: "#FF6500"
      }
    ])
  );

  const { state, dispatch } = React.useContext(Store);

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
      createExpenseAtIndex(e, i);
    }
    if (e.key === "Backspace" && expenses[i].expenseAmount === "") {
      e.preventDefault();
      return removeExpensesAtIndex(i);
    }
  }

  function createExpenseAtIndex(e, i) {
    const newExpenses = [...expenses];
    newExpenses.splice(i + 1, 0, {
      expenseName: "",
      expenseAmount: 0.0,
      expenseColor: COLOR_ARRAY[i]
    });
    setExpenses(newExpenses);
    setTimeout(() => {
      document.forms[0].elements[2 * i + 2].focus();
    }, 0);
    cacheExpenses(newExpenses);
  }

  function updateExpenseNameAtIndex(e, i) {
    const newExpenses = [...expenses];
    newExpenses[i].expenseName = e.target.value;
    setExpenses(newExpenses);
    cacheExpenses(newExpenses);
  }

  function updateExpenseAmountAtIndex(e, i) {
    const newExpenses = [...expenses];
    newExpenses[i].expenseAmount = e.target.value;
    setExpenses(newExpenses);
    cacheExpenses(newExpenses);
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
    cacheExpenses(retarr);
  }

  // eslint-disable-next-line
  function toggleExpenseCompleteAtIndex(index) {
    const temporaryExpenses = [...expenses];
    temporaryExpenses[index].isCompleted = !temporaryExpenses[index]
      .isCompleted;
    setExpenses(temporaryExpenses);
  }

  useEffect(() => {
    if (expenses.length !== state.expenses.length) {
      dispatch({
        type: "SET_EXPENSES",
        payload: expenses
      });
    }
  });

  return (
    <form className="expense-list">
      <ul>
        {expenses.map((expense, i) => (
          <div key={i} id={i} className="expense">
            <Rectangle
              width={40}
              height={20}
              fill={{ color: expense.expenseColor }}
            />
            <input
              type="text"
              placeholder="Expense"
              value={expense.expenseName}
              onKeyDown={e => handleKeyDownForExpenseName(e, i)}
              onChange={e => updateExpenseNameAtIndex(e, i)}
            />
            <input
              type="number"
              step=".01"
              min=".01"
              max="10000"
              value={expense.expenseAmount}
              onKeyDown={e => handleKeyDownForExpenseAmount(e, i)}
              onChange={e => updateExpenseAmountAtIndex(e, i)}
            />
          </div>
        ))}
      </ul>
    </form>
  );
}

export default List;
