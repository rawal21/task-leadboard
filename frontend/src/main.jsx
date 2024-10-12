
import React from 'react'; // Import React
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import App from './App.jsx'; // Import your main App component
import AddUser from './Components/AddUser.jsx'; // Import AddUser component

// Create the root element for rendering the React app
const root = createRoot(document.getElementById('root')); // Create the root using createRoot

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add" element={<AddUser />} /> {/* Corrected this route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
