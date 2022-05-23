import React, { useState } from 'react';

import Header from './components/Header';
import Form from './components/Form';
import Task from './components/Task';
import { AppContext } from './context';

function App() {
  const [newTask, setNewTask] = useState({
    task: '',
    deadline: undefined,
    completed: false,
    dateBy: new Date(),
    expired: false,
  });

  const [allTasks, setAllTasks] = useState([]);

  const [sortBy, setSortBy] = useState('all');

  const removeTask = (date) => {
    setAllTasks(allTasks.filter((task) => task.dateBy !== date));
  };

  const onChangeCompleted = (date, completed) => {
    setAllTasks(
      allTasks.map((task) => (task.dateBy === date ? { ...task, completed } : { ...task })),
    );
  };

  const onChangeStatus = (date) => {
    setAllTasks(
      allTasks.map((task) => (task.dateBy === date ? { ...task, expired: true } : { ...task })),
    );
  };

  return (
    <AppContext.Provider
      value={{
        newTask,
        setNewTask,
        allTasks,
        setAllTasks,
        removeTask,
        onChangeCompleted,
        onChangeStatus,
      }}>
      <div className="App">
        <Header setSortBy={setSortBy} />
        <Form sortBy={sortBy} />
        <div className="container-tasks">
          {sortBy === 'all'
            ? allTasks.map((item) => <Task key={item.dateBy} {...item} />)
            : sortBy === 'notCompleted'
            ? allTasks.map((item) => !item.completed && <Task key={item.dateBy} {...item} />)
            : sortBy === 'expired'
            ? allTasks.map(
                (item) => item.expired && !item.completed && <Task key={item.dateBy} {...item} />,
              )
            : sortBy === 'completed' &&
              allTasks.map((item) => item.completed && <Task key={item.dateBy} {...item} />)}
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
