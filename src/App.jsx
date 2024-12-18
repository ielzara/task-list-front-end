import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: false,
  },
];

const App = () => {
  const [tasks, setComplete] = useState(TASKS);

  const updateTaskStatus = (id) => {
    setComplete(tasks.map(task => {
      if (task.id === id) {
        return { ...task, isComplete : !task.isComplete};
      } else {
        return task;
      }
    }));
  };

  const deleteTask = id => {
    setComplete(tasks =>tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList tasks={tasks}
            onTaskToggle={updateTaskStatus}
            onDeleteTask={deleteTask}
          />}
        </div>
      </main>
    </div>
  );
};

export default App;
