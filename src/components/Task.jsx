import PropTypes from 'prop-types';

import './Task.css';

const Task = ( props ) => {
  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';
  const toggleEndpoint = props.isComplete ? 'mark_incomplete' : 'mark_complete';

  const toggleClicked = () => {
    props.toggleComplete(props.id, toggleEndpoint);
  };

  const removeClicked = () => {
    props.deleteTask(props.id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={toggleClicked}
      >
        {props.title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={removeClicked}
      >x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
