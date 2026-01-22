import React, { useState } from 'react';
import './App.css'; // Ensure this imports your CSS

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <h1>Theme Toggle SPA</h1>
      <p>This is a simple SPA with light and dark mode.</p>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
    </div>
  );
}

export default App;