import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kbaseURL = 'http://localhost:5000';

const convertFromApi = (apiTask) => {
  const { is_complete, ...rest } = apiTask;
  return {
    ...rest,
    isComplete: is_complete
  };
};

const getAllTasksApi = async () => {
  try {
    const response = await axios.get(`${kbaseURL}/tasks`);
    return response.data.map(convertFromApi);
  }
  catch (error) {
    console.error('Error fetching tasks', error);
    return [];
  }
};

const createTaskApi = async (task) => {
  try {
    const response = await axios.post(`${kbaseURL}/tasks`, {
      title: task.title,
      description: task.description
    });
    // The response includes the task in a nested "task" property
    return convertFromApi(response.data.task);
  }
  catch (error) {
    console.error('Error creating task', error);
    return null;
  }
};

const markTaskCompleteApi = async (id) => {
  try {
    const response = await axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`);
    return convertFromApi(response.data.task);
  }
  catch (error) {
    console.error('Error updating task', error);
  }
};

const markTaskIncompleteApi = async (id) => {
  try {
    const response = await axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`);
    return convertFromApi(response.data.task);
  }
  catch (error) {
    console.error('Error updating task', error);
  }
};

const deleteTaskApi = async (id) => {
  try {
    await axios.delete(`${kbaseURL}/tasks/${id}`);
  }
  catch (error) {
    console.error('Error deleting task', error);
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const tasks = await getAllTasksApi();
    setTasks(tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = (taskData) => {
    createTaskApi(taskData).then(task => {
      if (task) {
        setTasks([...tasks, task]);
      }
    });
  };

  const updateTaskStatus = (id) => {
    const task = tasks.find(t => t.id === id);
    const newStatus = !task.isComplete;
    const apiCall = newStatus
      ? markTaskCompleteApi(id)
      : markTaskIncompleteApi(id);

    apiCall.then((apiTask) => {
      setTasks(tasks.map(task => {
        if (task.id === id) {
          return apiTask;
        } else {
          return task;
        }
      }));
    });
  };

  const deleteTask = id => {
    deleteTaskApi(id).then(() => {
      setTasks(tasks => tasks.filter(task => task.id !== id));
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm createTask={createTask} />
          <TaskList tasks={tasks}
            onTaskToggle={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
