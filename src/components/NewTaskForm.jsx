import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';


const NewTaskForm = ({ onTaskAdd }) => {
  const[newTaskData, setNewTaskData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onTaskAdd(newTaskData);
    setNewTaskData(({ title: '', description: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <input
        type='text'
        placeholder="Enter your task here"
        value={newTaskData.title}
        onChange={(e) => setNewTaskData({...newTaskData, title: e.target.value})}
      />
      <input
        type='text'
        placeholder="Enter your task description here"
        value={newTaskData.description}
        onChange={(e) => setNewTaskData({...newTaskData, description: e.target.value})}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

NewTaskForm.propTypes= {
  onTaskAdd: PropTypes.func.isRequired,
};

export default NewTaskForm;