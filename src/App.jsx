import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const baseUrl = 'http://localhost:5000';

const getAllTasksApi = () => {
  return axios.get(`${baseUrl}/tasks`)
    .then( response => {
      return response.data.map(convertFromApi);
    })
    .catch( error => {
      console.log(error);
    });
};

const convertFromApi = (apiTask) => {
  const {id, title, description, is_complete} = apiTask;
  const newTask = {id, title, description, isComplete: is_complete};
  return newTask;
};

const toggleCompleteApi = (id, endpoint) => {
  return axios.patch(`${baseUrl}/tasks/${id}/${endpoint}`)
    .then(response => {
      return convertFromApi(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const removeTaskApi = (id) => {
  return axios.delete(`${baseUrl}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    });
};

const createTaskApi = (newTask) => {
  return axios.post(`${baseUrl}/tasks`, newTask)
    .then(response => {
      return convertFromApi(response.data);
    })
    .catch(error => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksApi()
      .then(tasks => setTaskData(tasks));
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const toggleComplete = (id, endpoint) => {
    return toggleCompleteApi(id, endpoint)
      .then(taskResult => {
        setTaskData(taskData => taskData.map(task => {
          if (task.id === taskResult.id) {
            return taskResult;
          } else {
            return task;
          }
        }));
      });
  };

  const deleteTask = id => {
    return removeTaskApi(id)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id !== id;
        }));
      });
  };

  const addTask = (newTask) => {
    return createTaskApi(newTask)
      .then(newTask => {
        setTaskData(prev => [...prev, newTask]);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            toggleComplete = {toggleComplete}
            deleteTask = {deleteTask}
          />
        </div>
        <NewTaskForm onTaskAdd={addTask}></NewTaskForm>
      </main>
    </div>
  );
};

export default App;
