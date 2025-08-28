import "./Upcoming.css"
import { useState, useEffect } from "react";
import tasksData from "../data/Tasks";
import { FaPlus } from "react-icons/fa";

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : tasksData;
};

export default function Today() {
  const [tasks, setTasks] = useState(loadTasks());
  const [activeForm, setActiveForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", date: "" });
  
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      date: todayStr,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", date: "" });
    setActiveForm(false);
  };

  const toggleTaskForm = () => {
    setActiveForm(!activeForm);
  };

  // Filter tasks for today
  const todayTasks = tasks.filter(task => task.date === todayStr);
  const totalTasks = todayTasks.length;
   

  return (
    <div className="today">
      <div className="section-header">
        <h2>Today</h2>
        <span className="task-count">
          {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      
      {!activeForm ? (
        <button 
          className="add-to-section"
          onClick={toggleTaskForm}
        >
          <FaPlus size={15} /> Add New Task
        </button>
      ) : (
        <form onSubmit={handleAddTask} className="section-task-form">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleInputChange}
            placeholder="Enter task title"
            className="task-input"
            required
            autoFocus
          />
          <div className="form-actions">
            <button type="submit" className="save-btn">Add</button>
            <button 
              type="button" 
              onClick={toggleTaskForm} 
              className="cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      <div className="task-list">
        {todayTasks.length > 0 ? (
          todayTasks.map(task => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed || false}
                onChange={() => toggleTaskCompletion(task.id)}
                className="task-checkbox"
              />
              <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            </div>
          ))
        ) : (
          <p>No tasks for today</p>
        )}
      </div>
    </div>
  )
}