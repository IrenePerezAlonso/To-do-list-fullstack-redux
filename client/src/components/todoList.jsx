/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loadTasks, addTask, deleteTask } from '../redux/actions/actionCreator';
import './todoList.css';

const TodoList = ({ tasks, dispatch }) => {
  useEffect(() => {
    if (!tasks.length) dispatch(loadTasks());
  }, []);

  function handleAddTask() {
    const newTask = document.getElementById('new-task-name').value;
    dispatch(addTask({ name: newTask }));
  }

  function handleDeleteTask(taskId) {
    dispatch(deleteTask(taskId));
  }

  return (
    <>
      <form className="new-task">
        <label htmlFor="new-task__input" className="new-task__input">
          <h3 className="input-tittle">ADD NEW TASK:</h3>
          <input
            type="text"
            id="new-task-name"
            className="input-input"
            placeholder="Ej. Buy milk"
          />
          <button
            className="input-addButton"
            type="button"
            onClick={() => handleAddTask()}
          >
            Add
          </button>
        </label>
      </form>
      <ul className="todo-list">
        {tasks.map((task) => (
          <li className="todo-list__task">
            {' '}
            {task.name}
            <button
              className="todo-list__deleteButton"
              type="button"
              onClick={() => handleDeleteTask(task._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tasks: PropTypes.shape([]).isRequired
};

function mapStateToProps({ tasks }) {
  return { tasks };
}

export default connect(mapStateToProps)(TodoList);
