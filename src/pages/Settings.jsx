import { useState, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faPalette, 
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';
import Future from '../components/Future';

export default function Settings() {
  const { isDarkMode: darkMode, toggleDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('account');
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    username: 'alexj',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'alexjohnson.dev',
    bio: 'Product Designer & Developer. Building things that matter.',
    joinDate: 'January 2023',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    marketingEmails: false,
    twoFactorAuth: true
  });
  
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/32.jpg');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Profile updated:', formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  const handleSignOut = () => {
    // Handle sign out logic
    console.log('User signed out');
  };
  
  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Account deletion requested');
    }
  };

  return (
    <div className={`settings-container ${darkMode ? 'dark' : 'light'}`}>
      <h1 className="settings-title">Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          <FontAwesomeIcon icon={faUser} className="tab-icon" />
          <span>Account</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <FontAwesomeIcon icon={faPalette} className="tab-icon" />
          <span>Preferences</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FontAwesomeIcon icon={faBell} className="tab-icon" />
          <span>Notifications</span>
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'account' && (
          <Future />
        ) }

        {activeTab === 'preferences' && (
          <div className="preferences-container">
            <h2>Display Preferences</h2>
            <div className="preference-item">
              <div>
                <h3>Dark Mode</h3>
                <p>Toggle between light and dark theme</p>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={toggleDarkMode} 
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="preference-item">
              <div>
                <h3>Default View</h3>
                <p>Choose what you see when opening the app</p>
              </div>
              <select className="form-select">
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="preference-item">
              <div>
                <h3>Task Completion Sound</h3>
                <p>Play a sound when completing tasks</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-container">
            <h2>Notification Settings</h2>
            <div className="notification-item">
              <div>
                <h3>Task Reminders</h3>
                <p>Get notified about upcoming tasks</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div>
                <h3>Daily Summary</h3>
                <p>Receive a daily summary of your tasks</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="notification-item">
              <div>
                <h3>Email Notifications</h3>
                <p>Receive notifications via email</p>
              </div>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}