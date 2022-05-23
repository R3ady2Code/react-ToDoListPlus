import React, { useContext } from 'react';
import useTimeoutHook from '../hooks/useTimeout';
import { AppContext } from '../context';

function Task({ ...item }) {
  const { removeTask, onChangeCompleted, onChangeStatus } = useContext(AppContext);

  const dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const timeToComplete = item.deadline - item.dateBy;
  useTimeoutHook(
    () => {
      if (item.deadline && !item.completed && !item.expired) {
        alert(`Задача "${item.task}" просрочена!`);
        onChangeStatus(item.dateBy);
      }
    },
    item.completed ? null : timeToComplete,
  );

  return (
    <div className="container-task df w60 m0">
      <div className="task-info">
        <h6 className={item.completed ? 'completed' : item.expired ? 'expired' : ''}>
          {item.task}
        </h6>
        <div className="textDate df">
          <p>Дата создания: {item.dateBy.toLocaleString([], dateOptions)}</p>
          {item.deadline && <p>Выполнить до: {item.deadline.toLocaleString([], dateOptions)}</p>}
        </div>
      </div>

      <div className="icons df">
        <p className="mt22">
          <label>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => onChangeCompleted(item.dateBy, e.target.checked)}
            />
            <span />
          </label>
        </p>
        <i
          className="red-text text-lighten-1 material-icons cp small"
          onClick={() => removeTask(item.dateBy)}>
          delete
        </i>
      </div>
    </div>
  );
}

export default Task;
