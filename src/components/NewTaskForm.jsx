import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NewTaskForm = ({ createTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (title.trim()) {
      createTask({
        title: title.trim(),
        description: description.trim() || ''
      });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form className="new-task-form" onSubmit={handleFormSubmit}>
      <div className="form-inputs">
        <label className="new-task-form__label" htmlFor="new-task-form__input">New Task</label>
        <input
          type="text"
          className="new-task-form__input"
          placeholder="Add new task here"
          value={title}
          onChange={handleTitleChange}
        />
        <input
          type="text"
          className="new-task-form__input"
          placeholder="Description (optional)"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button className="new-task-form__submit button" type="submit">Add Task</button>
    </form>
  );
};

NewTaskForm.propTypes = {
  createTask: PropTypes.func.isRequired,
};

export default NewTaskForm;


