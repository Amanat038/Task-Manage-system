import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await axios.post('http://localhost:5000/tasks', task);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div className="filter-container">
        <button className="btn btn-primary" onClick={() => setFilter('all')}>
          All
        </button>
        <button className="btn btn-warning" onClick={() => setFilter('pending')}>
          Pending
        </button>
        <button className="btn btn-success" onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>
      <TaskList
        tasks={tasks.filter(
          (task) => filter === 'all' || task.status === filter
        )}
        updateTask={updateTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
