import { useState } from "react";
import tasksData from "../data/Tasks";
import "./Upcoming.css";

export default function Upcoming() {
  const [tasks, setTasks] = useState(tasksData);
  const [activeForm, setActiveForm] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", date: "" });

  const today = new Date();
  const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD

  // Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  // End of this week (Sunday)
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + (7 - today.getDay()));

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle new task input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  // Add new task
  const handleAddTask = (e, customDate = null) => {
    e.preventDefault();
    const taskDate = customDate || newTask.date;
    if (!newTask.title.trim() || !taskDate) return;
    
    const newTaskObj = {
      id: Date.now(), // Use timestamp for unique IDs
      title: newTask.title,
      date: taskDate,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", date: "" });
  };

  // Add new task with specific date
  const addTask = (date, e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    
    const newTaskObj = {
      id: Date.now(),
      title: newTask.title,
      date: date,
      completed: false
    };
    
    setTasks([...tasks, newTaskObj]);
    setNewTask({ title: "", date: "" });
    setActiveForm(null);
  };

  // Format date for date input (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };
  
  // Get the next weekday (Monday-Friday) after given date
  const getNextWeekday = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    while (nextDay.getDay() === 0 || nextDay.getDay() === 6) {
      nextDay.setDate(nextDay.getDate() + 1);
    }
    
    return nextDay;
  };

  // Toggle task form visibility
  const toggleTaskForm = (section) => {
    setActiveForm(activeForm === section ? null : section);
  };

  // Filters
  const todayTasks = tasks.filter(task => task.date === todayStr);
  const tomorrowTasks = tasks.filter(task => task.date === tomorrowStr);
  const weekTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    return taskDate > tomorrow && taskDate <= weekEnd;
  });

  return (
    <div className="upcoming-container">
      <h1>Upcoming Tasks</h1>
      <div className="tasks-time">
        <div className="today">
          <div className="section-header">
            <h2>Today</h2>
            <button 
              className="add-to-section"
              onClick={() => toggleTaskForm('today')}
            >
              + Add Task
            </button>
          </div>
          
          {activeForm === 'today' && (
            <form onSubmit={(e) => addTask(todayStr, e)} className="section-task-form">
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
              <input
                type="hidden"
                name="date"
                value={todayStr}
              />
              <div className="form-actions">
                <button type="submit" className="save-btn">Add</button>
                <button type="button" onClick={() => setActiveForm(null)} className="cancel-btn">Cancel</button>
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

        <div className="next-tasks">
          <div className="tomorrow">
            <div className="section-header">
              <h2>Tomorrow</h2>
              <button 
                className="add-to-section"
                onClick={() => toggleTaskForm('tomorrow')}
              >
                + Add Task
              </button>
            </div>
            
            {activeForm === 'tomorrow' && (
              <form onSubmit={(e) => addTask(tomorrowStr, e)} className="section-task-form">
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
                <input
                  type="hidden"
                  name="date"
                  value={tomorrowStr}
                />
                <div className="form-actions">
                  <button type="submit" className="save-btn">Add</button>
                  <button type="button" onClick={() => setActiveForm(null)} className="cancel-btn">Cancel</button>
                </div>
              </form>
            )}
            <div className="task-list">
              {tomorrowTasks.length > 0 ? (
                tomorrowTasks.map(task => (
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
                <p>No tasks for tomorrow</p>
              )}
            </div>
          </div>

          <div className="this-week">
            <div className="section-header">
              <h2>This Week</h2>
              <button 
                className="add-to-section"
                onClick={() => toggleTaskForm('week')}
              >
                + Add Task
              </button>
            </div>
            
            {activeForm === 'week' && (
              <form onSubmit={(e) => {
                const selectedDate = new Date(e.target.date.value);
                const nextWeekday = getNextWeekday(tomorrow);
                const defaultDate = selectedDate && !isNaN(selectedDate.getTime()) ? 
                  formatDateForInput(selectedDate) : 
                  formatDateForInput(nextWeekday);
                
                addTask(defaultDate, e);
              }} className="section-task-form">
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
                <div className="date-picker">
                  <label htmlFor="task-date">Due Date: </label>
                  <input
                    type="date"
                    id="task-date"
                    name="date"
                    min={tomorrowStr}
                    max={formatDateForInput(weekEnd)}
                    defaultValue={formatDateForInput(getNextWeekday(tomorrow))}
                    className="date-input"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="save-btn">Add</button>
                  <button type="button" onClick={() => setActiveForm(null)} className="cancel-btn">Cancel</button>
                </div>
              </form>
            )}
            <div className="task-list">
              {weekTasks.length > 0 ? (
                weekTasks.map(task => (
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
                <p>No upcoming tasks this week</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
