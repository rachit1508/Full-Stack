import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Profile() {
  return (
    <div className="page">
      <img
        src="profile.png"
        alt="profile"
        className="profile-pic"
      />
      <h2 className="name">Rachit Jha</h2>
      <p className="designation">Data Analyist</p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="page">
      <h2 className="section-title">My Skills</h2>
      <ul className="skills">
        <li>React.js</li>
        <li>JavaScript</li>
        <li>Node.js</li>
        <li>HTML & CSS</li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="container card">
        <nav className="navbar">
          <Link to="/">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;