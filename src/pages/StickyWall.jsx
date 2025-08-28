import { useState, useRef, useEffect } from 'react';
import { FaPlus, FaTimes, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import './StickyWall.css';

const COLORS = [
  '#FFE4E1', // Misty Rose
  '#F0FFF0', // Honeydew
  '#F0F8FF', // Alice Blue
  '#FFF0F5', // Lavender Blush
  '#F5F5DC', // Beige
  '#F0FFFF', // Azure
  '#FFF8DC', // Cornsilk
  '#F5F5F5', // White Smoke
  '#FFFAF0', // Floral White
  '#F8F8FF'  // Ghost White
];

// Helper function to get notes from localStorage
const getStoredNotes = () => {
  try {
    const saved = localStorage.getItem('stickyNotes');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading notes from localStorage:', error);
    return [];
  }
};

export default function StickyWall() {
  const [notes, setNotes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', tasks: [''] });
  const [editingId, setEditingId] = useState(null);
  const formRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  // Only run on client-side after mount
  useEffect(() => {
    setIsClient(true);
    // Load notes from localStorage on component mount
    const loadedNotes = getStoredNotes();
    if (loadedNotes.length > 0) {
      setNotes(loadedNotes);
    }
  }, []);

  // Load notes from localStorage on component mount
  useEffect(() => {
    try {
      console.log('Loading notes from localStorage...');
      const savedNotes = localStorage.getItem('stickyNotes');
      console.log('Raw saved notes:', savedNotes);
      
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes);
        console.log('Parsed notes:', parsedNotes);
        
        // Ensure we have a valid array before setting state
        if (Array.isArray(parsedNotes)) {
          console.log('Setting notes state with:', parsedNotes);
          setNotes(parsedNotes);
        } else {
          console.warn('Saved notes is not an array:', parsedNotes);
        }
      } else {
        console.log('No saved notes found in localStorage');
      }
    } catch (error) {
      console.error('Failed to load notes from localStorage:', error);
      // Initialize with empty array if there's an error
      setNotes([]);
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    if (!isClient) return; // Don't run on server-side
    
    try {
      if (notes.length > 0) {
        localStorage.setItem('stickyNotes', JSON.stringify(notes));
      } else {
        localStorage.removeItem('stickyNotes');
      }
    } catch (error) {
      console.error('Failed to save notes to localStorage:', error);
    }
  }, [notes, isClient]);

  const handleAddTask = () => {
    setNewNote(prev => ({
      ...prev,
      tasks: [...prev.tasks, '']
    }));
  };

  const handleTaskChange = (index, value) => {
    const updatedTasks = [...newNote.tasks];
    updatedTasks[index] = value;
    setNewNote(prev => ({ ...prev, tasks: updatedTasks }));
  };

  const removeTask = (index) => {
    const updatedTasks = newNote.tasks.filter((_, i) => i !== index);
    setNewNote(prev => ({ ...prev, tasks: updatedTasks }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = newNote.title.trim();
    if (!title) return;
    
    const tasks = newNote.tasks
      .map(task => task.trim())
      .filter(task => task !== '');
    
    const note = {
      id: editingId || Date.now(),
      title,
      tasks: tasks.length > 0 ? tasks : [''],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      createdAt: editingId ? notes.find(n => n.id === editingId)?.createdAt || new Date().toISOString() : new Date().toISOString()
    };

    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? note : n));
    } else {
      setNotes([...notes, note]);
    }

    resetForm();
  };

  const resetForm = () => {
    setNewNote({ title: '', tasks: [''] });
    setEditingId(null);
    setIsAdding(false);
  };

  const deleteNote = (id, e) => {
    e.stopPropagation();
    const updatedNotes = notes.filter(note => note.id !== id);
    console.log('Deleting note. New notes array:', updatedNotes);
    setNotes(updatedNotes);
  };

  const editNote = (note) => {
    setNewNote({ title: note.title, tasks: [...note.tasks, ''] });
    setEditingId(note.id);
    setIsAdding(true);
  };

  const toggleTask = (noteId, taskIndex) => {
    setNotes(notes.map(note => {
      if (note.id === noteId) {
        const updatedTasks = [...note.tasks];
        const task = updatedTasks[taskIndex];
        if (task.startsWith('✓ ')) {
          updatedTasks[taskIndex] = task.substring(2);
        } else {
          updatedTasks[taskIndex] = `✓ ${task}`;
        }
        return { ...note, tasks: updatedTasks };
      }
      return note;
    }));
  };

  return (
    <div className="sticky-wall">
      <h1>Sticky Wall</h1>
      
      {!isAdding ? (
        <button 
          className="add-sticky-btn"
          onClick={() => setIsAdding(true)}
        >
          <FaPlus size={24} />
        </button>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="sticky-form">
          <div className="form-group">
            <input
              type="text"
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Title"
              className="sticky-title-input"
              required
              autoFocus
            />
            <button 
              type="button" 
              className="close-btn"
              onClick={resetForm}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="tasks-list">
            {newNote.tasks.map((task, index) => (
              <div key={index} className="task-input-group">
                <input
                  type="text"
                  value={task}
                  onChange={(e) => handleTaskChange(index, e.target.value)}
                  placeholder={`Task ${index + 1}`}
                  className="task-input"
                />
                {newNote.tasks.length > 1 && (
                  <button
                    type="button"
                    className="remove-task-btn"
                    onClick={() => removeTask(index)}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-task-btn"
              onClick={handleAddTask}
            >
              + Add Task
            </button>
          </div>
        <div className="btbt">
            
        <button type="submit" className="save-btn">
            {editingId ? 'Update' : 'Create'} Note
          </button>
        </div>
        </form>
      )}

      <div className="sticky-notes-grid">
        {notes.map(note => (
          <div 
            key={note.id} 
            className="sticky-note"
            style={{ backgroundColor: note.color }}
            onClick={() => editNote(note)}
          >
            <div className="sticky-note-header">
              <h3>{note.title}</h3>
              <button 
                className="delete-note-btn"
                onClick={(e) => deleteNote(note.id, e)}
              >
                <FaTrash />
              </button>
            </div>
            <ul className="sticky-tasks">
              {note.tasks.map((task, index) => (
                <li 
                  key={index} 
                  className={`sticky-task ${task.startsWith('✓ ') ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(note.id, index);
                  }}
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}