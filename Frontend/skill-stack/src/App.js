// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import UsersPage from "./pages/UsersPage";
// import SkillsPage from "./pages/SkillsPage";

// function App() {
//   return (
//     <Router>
//       <nav style={{ padding: "10px", background: "#f4f4f4" }}>
//         <Link to="/users">Users</Link> | <Link to="/skills/1">Skills</Link>
//       </nav>
//       <Routes>
//         <Route path="/users" element={<UsersPage />} />
//         <Route path="/skills/:userId" element={<SkillsPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api"; // backend URL

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [skills, setSkills] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [skillForm, setSkillForm] = useState({ name: "", category: "", difficulty: 1 });

  // Load users
  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };

  // Add user
  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/users`, form);
      setForm({ name: "", email: "" });
      loadUsers();
    } catch (err) {
      console.error("Error creating user", err);
    }
  };

  // Load skills for a user
  const loadSkills = async (userId) => {
    try {
      const res = await axios.get(`${API_BASE}/users/${userId}/skills`);
      setSkills(res.data);
      setSelectedUser(userId);
    } catch (err) {
      console.error("Error loading skills", err);
    }
  };

  // Add skill
  const addSkill = async (e) => {
    e.preventDefault();
    if (!selectedUser) return alert("Select a user first!");
    try {
      await axios.post(`${API_BASE}/users/${selectedUser}/skills`, skillForm);
      setSkillForm({ name: "", category: "", difficulty: 1 });
      loadSkills(selectedUser);
    } catch (err) {
      console.error("Error adding skill", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚡ SkillStack Test Frontend (No Router)</h1>

      {/* User Section */}
      <h2>Users</h2>
      <form onSubmit={addUser}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email}) — Skills: {u.skills.length}{" "}
            <button onClick={() => loadSkills(u.id)}>View Skills</button>
          </li>
        ))}
      </ul>

      {/* Skills Section */}
      {selectedUser && (
        <>
          <h2>Skills for User {selectedUser}</h2>
          <form onSubmit={addSkill}>
            <input
              placeholder="Skill name"
              value={skillForm.name}
              onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
            />
            <input
              placeholder="Category"
              value={skillForm.category}
              onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
            />
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Difficulty"
              value={skillForm.difficulty}
              onChange={(e) =>
                setSkillForm({ ...skillForm, difficulty: parseInt(e.target.value) })
              }
            />
            <button type="submit">Add Skill</button>
          </form>

          <ul>
            {skills.map((s) => (
              <li key={s.id}>
                {s.name} ({s.category}) [Difficulty {s.difficulty}]
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;


