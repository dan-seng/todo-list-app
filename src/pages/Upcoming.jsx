import { useState, useEffect } from "react";
import { FaPlus, FaSun, FaMoon } from "react-icons/fa";

import "./Upcoming.css";

const loadTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export default function Upcoming() {
  const [tasks, setTasks] = useState([]);
  const [activeForm, setActiveForm] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", date: "" });
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };
  
  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  useEffect(() => {
    setTasks(loadTasks());
  }, []);
  const normalizeDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const today = new Date();
  const todayStr = normalizeDate(today);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = normalizeDate(tomorrow);
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() + 1);
  const maxDateStr = normalizeDate(maxDate);
  
  // For the week view, we want to show tasks from today until 7 days from now
  const todayDate = new Date(today);

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
    
    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);
    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
    const taskDateStr = task.date;
    
    // Skip if it's today or tomorrow (they have their own sections)
    if (taskDateStr === todayStr || taskDateStr === tomorrowStr) {
      return false;
    }
    
    // Include tasks from today+2 to today+7
    const weekLater = new Date(today);
    weekLater.setDate(today.getDate() + 7);
    return taskDate > new Date(tomorrow) && taskDate <= weekLater;
  });
  
  // Tasks more than a week away
  const otherTasks = tasks.filter(task => {
    const taskDate = new Date(task.date);
    const weekLater = new Date(today);
    weekLater.setDate(today.getDate() + 7);
    return taskDate > weekLater && taskDate <= maxDate;
  });
  

  // Calculate total tasks
  const totalTasks = tasks.length;

  return (
    <div className="upcoming-container">
      <div className="header-container">
        <div className="header-left">
          <h1>Upcoming Tasks</h1>
          <span className="task-count">{totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}</span>
        </div>
        <button 
          onClick={toggleDarkMode} 
          className="theme-toggle"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="tasks-time">
        <div className="today">
          <div className="section-header">
            <h2>Today</h2>
           
          </div>
          <button 
              className="add-to-section"
              onClick={() => toggleTaskForm('today')}
            >
              <FaPlus size={15} /> Add New Task
            </button>
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
             
            </div>
            <button 
                className="add-to-section"
                onClick={() => toggleTaskForm('tomorrow')}
              >
               <FaPlus size={15} /> Add New Task
              </button>
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
            </div>
            <button 
                className="add-to-section"
                onClick={() => toggleTaskForm('week')}
              >
               <FaPlus size={15} /> Add New Task
              </button>
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
                    min={todayStr}
                    max={maxDateStr}
                    defaultValue={todayStr}
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
                    <div className="task-content">
                      <span className={task.completed ? "completed" : ""}>
                        {task.title}
                      </span>
                      <span className="task-date">
                        {new Date(task.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No upcoming tasks this week</p>
              )}
            </div>
          </div>
          
          {/* Others Section */}
         
        </div>
        <div className="others">
            <div className="section-header">
              <h2>Others</h2>
              <button 
                className="add-to-section"
                onClick={() => toggleTaskForm('others')}
              >
                <FaPlus size={15} /> Add New Task
              </button>
            </div>
            
            {activeForm === 'others' && (
              <form onSubmit={(e) => {
                const selectedDate = new Date(e.target.date.value);
                const nextWeek = new Date(today);
                nextWeek.setDate(today.getDate() + 8); // First day of 'Others' section
                const defaultDate = selectedDate && !isNaN(selectedDate.getTime()) ? 
                  formatDateForInput(selectedDate) : 
                  formatDateForInput(nextWeek);
                
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
                  <label htmlFor="task-date-others">Due Date: </label>
                  <input
                    type="date"
                    id="task-date-others"
                    name="date"
                    min={formatDateForInput(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000))} // 8 days from now
                    max={maxDateStr}
                    defaultValue={formatDateForInput(new Date(today.getTime() + 8 * 24 * 60 * 60 * 1000))}
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
              {otherTasks.length > 0 ? (
                otherTasks.map(task => (
                  <div key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-content">
                      <span className={task.completed ? "completed" : ""}>
                        {task.title}
                      </span>
                      <span className="task-date">
                        {new Date(task.date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tasks scheduled beyond next week</p>
              )}
            </div>
          </div>
      </div>
    </div>
  );
}
