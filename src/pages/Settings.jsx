import { useState, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faPalette, 
  faBell,
  faSave,
  faCheckCircle,
  faCamera,
  faTrash,
  faEnvelope,
  faPhone,
  faGlobe,
  faMapMarkerAlt,
  faCalendarAlt,
  faLock,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import './Settings.css';

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
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="profile-header">
              <div className="profile-image-container" onClick={triggerFileInput}>
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="profile-image"
                />
                <div className="profile-image-overlay">
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="profile-info">
                <h2>{formData.name}</h2>
                <p className="text-muted">Member since {formData.joinDate}</p>
              </div>
            </div>

            <div className="settings-section">
              <h3>Personal Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Username</label>
                  <div className="input-with-icon">
                    <span className="input-prefix">@</span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faPhone} className="input-icon" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="3"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Website</label>
                  <div className="input-with-icon">
                    <FontAwesomeIcon icon={faGlobe} className="input-icon" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Security</h3>
              <div className="form-group">
                <label>Current Password</label>
                <div className="input-with-icon">
                  <FontAwesomeIcon icon={faLock} className="input-icon" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="New password"
                />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Confirm new password"
                />
              </div>
              
              <div className="form-check">
                <input
                  type="checkbox"
                  id="twoFactorAuth"
                  name="twoFactorAuth"
                  checked={formData.twoFactorAuth}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
              </div>
            </div>
            
            <div className="settings-section">
              <h3>Email Preferences</h3>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <label htmlFor="emailNotifications">Email notifications</label>
              </div>
              
              <div className="form-check">
                <input
                  type="checkbox"
                  id="marketingEmails"
                  name="marketingEmails"
                  checked={formData.marketingEmails}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <label htmlFor="marketingEmails">Marketing emails</label>
              </div>
            </div>
          
            <div className="settings-actions">
              <button 
                type="submit" 
                className="save-btn"
                disabled={isSaving}
              >
                {isSaving ? (
                  'Saving...'
                ) : (
                  <>
                    <FontAwesomeIcon icon={saveSuccess ? faCheckCircle : faSave} className="mr-2" />
                    {saveSuccess ? 'Saved Successfully!' : 'Save Changes'}
                  </>
                )}
              </button>
              
              <div className="account-actions">
                <button type="button" className="btn btn-outline" onClick={handleSignOut}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Sign Out
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDeleteAccount}>
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                  Delete Account
                </button>
              </div>
            </div>
          </form>
        )}

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