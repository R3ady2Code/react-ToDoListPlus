import React from 'react';
import { Link } from 'react-router-dom';

function Header({ setSortBy }) {
  return (
    <nav className="mb3">
      <div className="nav-wrapper deep-purple lighten-1">
        <Link to="/" className="brand-logo center">
          ToDoList+
        </Link>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li>
            <Link to="/" onClick={() => setSortBy('all')}>
              All
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setSortBy('notCompleted')}>
              Not completed
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setSortBy('expired')}>
              Overdue
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setSortBy('completed')}>
              Completed
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
