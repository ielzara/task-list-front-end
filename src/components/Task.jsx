import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onTaskToggle, onDeleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const handleClickedButton = () => {
    onTaskToggle(id);
  };

  const handleRemoveButton = () => {
    onDeleteTask(id);
  };
  return (
    <li className="tasks__item">
      <button className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleClickedButton}
      >
        {title}
      </button>
      <button className="tasks__item__remove button"
        onClick={handleRemoveButton}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
