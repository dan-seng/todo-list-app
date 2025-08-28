import { useState, useEffect } from "react";
import tasksData from "../data/Tasks";
import { FaPlus } from "react-icons/fa";
import "./ThisWeek.css";


const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : tasksData;
};

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export default function ThisWeek() {
  const [tasks, setTasks] = useState(loadTasks());
  const [activeForm, setActiveForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", date: "" });
  
  const today = new Date();
  const todayStr = formatDate(today);
  
  // Calculate start and end of current week (Monday to Sunday)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Monday
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday

  // Save tasks to localStorage whenever they change
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

  const handleAddTask = (e, customDate = null) => {
    e.preventDefault();
    const taskDate = customDate || newTask.date || todayStr;
    if (!newTask.title.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      date: taskDate,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", date: "" });
    setActiveForm(false);
  };

  const toggleTaskForm = () => {
    setActiveForm(!activeForm);
  };

  // Filter tasks for this week
  const thisWeekTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate >= startOfWeek && taskDate <= endOfWeek;
  });

  // Group tasks by day
  const tasksByDay = {};
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Initialize empty arrays for each day
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const dateStr = formatDate(date);
    tasksByDay[dateStr] = [];
  }
  
  // Populate tasks for each day
  thisWeekTasks.forEach(task => {
    const taskDate = new Date(task.date);
    const dateStr = formatDate(taskDate);
    if (tasksByDay[dateStr]) {
      tasksByDay[dateStr].push(task);
    }
  });

  return (
    <div className="this-week-container">
      <div className="this-week-header">
        <h1>This Week</h1>
        <span className="this-week-count">
          {thisWeekTasks.length} {thisWeekTasks.length === 1 ? 'task' : 'tasks'} this week
        </span>
      </div>
      
      {!activeForm ? (
        <button 
          className="this-week-add-btn"
          onClick={toggleTaskForm}
        >
          <FaPlus size={15} /> Add New Task
        </button>
      ) : (
        <form onSubmit={handleAddTask} className="this-week-form">
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
          placeholder="Enter task title"
          className="this-week-input"
          required
          autoFocus
        />
        <input
          type="date"
          name="date"
          value={newTask.date}
          onChange={handleInputChange}
          min={todayStr}
          max={formatDate(endOfWeek)}
          className="this-week-input"
        />
        <div className="this-week-form-actions">
          <button type="submit" className="this-week-btn this-week-save-btn">Add</button>
          <button 
            type="button" 
            onClick={toggleTaskForm} 
            className="this-week-btn this-week-cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>
      )}
      
      <div className="this-week-grid">
        {Object.entries(tasksByDay).map(([date, dayTasks]) => {
          const dayDate = new Date(date);
          const dayName = daysOfWeek[dayDate.getDay()];
          const isToday = date === todayStr;
          
          return (
            <div key={date} className={`this-week-day ${isToday ? 'this-week-today' : ''}`}>
              <div className="this-week-day-header">
                <h3 className="this-week-day-title">{dayName}</h3>
                <span className="this-week-date">
                  {dayDate.getDate()}/{dayDate.getMonth() + 1}
                </span>
              </div>
              
              <div className="this-week-task-list">
                 {dayTasks.length > 0 ? (
                  dayTasks.map(task => (
               <div key={task.id} className="this-week-task-item">
                <input
                  type="checkbox"
                  checked={task.completed || false}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="this-week-task-checkbox"
                />
                <span className={task.completed ? "this-week-task-completed" : ""}>
                  {task.title}
                </span>
             </div>
    ))
  ) : (
    <p className="this-week-no-tasks">No tasks</p>
  )}
</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}