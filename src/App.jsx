import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/Calendar';
import List from './Components/List';

function App() {
  return (
    <div className="container">
      <h1 className="Header">Cost Calculator</h1>
      <div className="row">
        <div className="col-sm-8">
          <h2 className="Calendar">Cost in Days of Work</h2>
          <Calendar />
        </div>
        <div className="col-sm-4">
          <h2 className="Expenses">Expenses</h2>
          <List />
        </div>
      </div>
    </div>
  );
}

export default App;
