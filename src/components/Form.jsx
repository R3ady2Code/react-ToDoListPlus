import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../context';

function Form({ sortBy }) {
  const [taskDeadline, setTaskDeadline] = useState({ date: '', time: '' });

  const [deadlineDisabled, setDeadlineDisabled] = useState(true);

  const { newTask, setNewTask, allTasks, setAllTasks } = useContext(AppContext);

  const renderTask = () => {
    function patternOfRender() {
      setNewTask({ ...newTask, dateBy: Date.now() });
      setAllTasks([newTask, ...allTasks]);
      setNewTask({ ...newTask, task: '', dateBy: new Date(), deadline: undefined });
      setTaskDeadline({ date: '', time: '' });
    }

    if (newTask.deadline) {
      if (newTask.deadline > Date.now()) {
        patternOfRender();
      } else {
        alert('Введите число не раньше сегодняшнего');
      }
    } else {
      patternOfRender();
    }
  };

  const onClickToAddTask = (e) => {
    e.preventDefault();
    if (newTask.task.length === 0) {
      alert('Заполните текст задачи!');
      return;
    }
    if (deadlineDisabled) {
      renderTask();
    } else {
      if ((taskDeadline.date !== '') & (taskDeadline.time !== '')) {
        renderTask();
      } else {
        alert('Заполните поля для дэдлайна!');
      }
    }
  };

  useEffect(() => {
    setNewTask(() => ({
      ...newTask,
      deadline: !deadlineDisabled
        ? new Date(taskDeadline.date.toString() + 'T' + taskDeadline.time.toString())
        : undefined,
    }));
  }, [taskDeadline.date, taskDeadline.time, deadlineDisabled]);

  const onChangeDeadlineDisable = () => {
    setDeadlineDisabled(!deadlineDisabled);
  };

  return (
    <form className="task-form w60 m0">
      <div className="input-field w60">
        <input
          type="text"
          id="task"
          placeholder="Please, text your task"
          value={newTask.task}
          onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
        />
      </div>
      <div className="parameters df">
        <div className="date df">
          <div className="switch mr1">
            <label>
              Off
              <input type="checkbox" onChange={(e) => onChangeDeadlineDisable(e)} />
              <span className="lever"></span>
              On
            </label>
          </div>
          <div className="df w15 fl">
            <div className="input-field">
              <input
                type="date"
                id="date"
                disabled={deadlineDisabled}
                value={taskDeadline.date}
                onChange={(e) => setTaskDeadline({ ...taskDeadline, date: e.target.value })}
              />
            </div>
            <div className="input-field">
              <input
                type="time"
                id="time"
                disabled={deadlineDisabled}
                value={taskDeadline.time}
                onChange={(e) => setTaskDeadline({ ...taskDeadline, time: e.target.value })}
              />
            </div>
          </div>
        </div>
        <>
          <button
            onClick={onClickToAddTask}
            className="btn-add btn-floating btn-large deep-purple lighten-1">
            <i className="material-icons">add</i>
          </button>
        </>
      </div>
    </form>
  );
}

export default Form;
