# 📝 Todo List Application

A modern, frontend-only Todo List application designed to help you stay organized and boost your productivity. Built with React and modern web technologies, this application offers a seamless user experience with its responsive design and intuitive interface. All data is stored locally in your browser's localStorage.

## 🎯 Features

### 📋 Task Management
- **Create** new tasks with titles and due dates
- **Mark tasks as complete/incomplete** with a single click
- **Edit** task details directly
- **Delete** tasks you no longer need
- Tasks are automatically saved to your browser's localStorage

### 🗓️ Multiple Views
- **Today** - See tasks due today
- **This Week** - View your weekly tasks
- **This Month** - Monthly task overview
- **Upcoming** - All your upcoming tasks in one place
- **Calendar View** - Visualize your tasks on a calendar
- **Sticky Wall** - A freeform space for quick notes and ideas

### 🎨 User Experience
- **Dark/Light theme** - Switch between themes based on your preference
- **Responsive design** - Works on desktop and mobile devices
- **Intuitive UI** - Clean and modern interface for maximum usability
- **Quick add** - Add tasks quickly with the floating action button

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm (v8 or later) or yarn (v1.22 or later)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the application**
   The application will be available at [http://localhost:5173](http://localhost:5173)
   - The application will automatically reload if you make changes to the source files
## 🛠️ Built With

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React applications
- [React Router](https://reactrouter.com/) - For client-side routing
- [GSAP](https://greensock.com/gsap/) - For smooth animations
- [React Calendar](https://github.com/wojtekmaj/react-calendar) - For the calendar view

## 📂 Project Structure

```
todo-app/
├── public/            # Static files
├── src/               # Source files
│   ├── assets/        # Images and other assets
│   ├── components/    # Reusable UI components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Application entry point
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Future Improvements

- Add task categories and tags
- Implement task priorities
- Add search functionality
- Enable task sharing via link
- Add task export/import functionality
