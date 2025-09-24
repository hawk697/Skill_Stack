// // // import React from "react";
// // // import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// // // import UsersPage from "./pages/UsersPage";
// // // import SkillsPage from "./pages/SkillsPage";

// // // function App() {
// // //   return (
// // //     <Router>
// // //       <nav style={{ padding: "10px", background: "#f4f4f4" }}>
// // //         <Link to="/users">Users</Link> | <Link to="/skills/1">Skills</Link>
// // //       </nav>
// // //       <Routes>
// // //         <Route path="/users" element={<UsersPage />} />
// // //         <Route path="/skills/:userId" element={<SkillsPage />} />
// // //       </Routes>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const API_BASE = "http://127.0.0.1:8000/api"; // backend URL

// // function App() {
// //   const [users, setUsers] = useState([]);
// //   const [form, setForm] = useState({ name: "", email: "" });
// //   const [skills, setSkills] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [skillForm, setSkillForm] = useState({ name: "", category: "", difficulty: 1 });

// //   // Load users
// //   const loadUsers = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/users`);
// //       setUsers(res.data);
// //     } catch (err) {
// //       console.error("Error loading users", err);
// //     }
// //   };

// //   // Add user
// //   const addUser = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post(`${API_BASE}/users`, form);
// //       setForm({ name: "", email: "" });
// //       loadUsers();
// //     } catch (err) {
// //       console.error("Error creating user", err);
// //     }
// //   };

// //   // Load skills for a user
// //   const loadSkills = async (userId) => {
// //     try {
// //       const res = await axios.get(`${API_BASE}/users/${userId}/skills`);
// //       setSkills(res.data);
// //       setSelectedUser(userId);
// //     } catch (err) {
// //       console.error("Error loading skills", err);
// //     }
// //   };

// //   // Add skill
// //   const addSkill = async (e) => {
// //     e.preventDefault();
// //     if (!selectedUser) return alert("Select a user first!");
// //     try {
// //       await axios.post(`${API_BASE}/users/${selectedUser}/skills`, skillForm);
// //       setSkillForm({ name: "", category: "", difficulty: 1 });
// //       loadSkills(selectedUser);
// //     } catch (err) {
// //       console.error("Error adding skill", err);
// //     }
// //   };

// //   useEffect(() => {
// //     loadUsers();
// //   }, []);

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h1>⚡ SkillStack Test Frontend (No Router)</h1>

// //       {/* User Section */}
// //       <h2>Users</h2>
// //       <form onSubmit={addUser}>
// //         <input
// //           placeholder="Name"
// //           value={form.name}
// //           onChange={(e) => setForm({ ...form, name: e.target.value })}
// //         />
// //         <input
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={(e) => setForm({ ...form, email: e.target.value })}
// //         />
// //         <button type="submit">Add User</button>
// //       </form>

// //       <ul>
// //         {users.map((u) => (
// //           <li key={u.id}>
// //             {u.name} ({u.email}) — Skills: {u.skills.length}{" "}
// //             <button onClick={() => loadSkills(u.id)}>View Skills</button>
// //           </li>
// //         ))}
// //       </ul>

// //       {/* Skills Section */}
// //       {selectedUser && (
// //         <>
// //           <h2>Skills for User {selectedUser}</h2>
// //           <form onSubmit={addSkill}>
// //             <input
// //               placeholder="Skill name"
// //               value={skillForm.name}
// //               onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
// //             />
// //             <input
// //               placeholder="Category"
// //               value={skillForm.category}
// //               onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
// //             />
// //             <input
// //               type="number"
// //               min="1"
// //               max="5"
// //               placeholder="Difficulty"
// //               value={skillForm.difficulty}
// //               onChange={(e) =>
// //                 setSkillForm({ ...skillForm, difficulty: parseInt(e.target.value) })
// //               }
// //             />
// //             <button type="submit">Add Skill</button>
// //           </form>

// //           <ul>
// //             {skills.map((s) => (
// //               <li key={s.id}>
// //                 {s.name} ({s.category}) [Difficulty {s.difficulty}]
// //               </li>
// //             ))}
// //           </ul>
// //         </>
// //       )}
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const API_BASE = "http://127.0.0.1:8000/api"; // backend URL

// function App() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "" });
//   const [skills, setSkills] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [skillForm, setSkillForm] = useState({ name: "", category: "", difficulty: 1 });

//   // Learning goals (local state for now)
//   const [goals, setGoals] = useState([]);
//   const [goalForm, setGoalForm] = useState({
//     skill: "",
//     resource: "video",
//     platform: "YouTube",
//     status: "started",
//     hours: 0,
//     notes: "",
//     difficulty: 1,
//   });

//   // Load users
//   const loadUsers = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/users`);
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error loading users", err);
//     }
//   };

//   // Add user
//   const addUser = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_BASE}/users`, form);
//       setForm({ name: "", email: "" });
//       loadUsers();
//     } catch (err) {
//       console.error("Error creating user", err);
//     }
//   };

//   // Load skills for a user
//   const loadSkills = async (userId) => {
//     try {
//       const res = await axios.get(`${API_BASE}/users/${userId}/skills`);
//       setSkills(res.data);
//       setSelectedUser(userId);
//     } catch (err) {
//       console.error("Error loading skills", err);
//     }
//   };

//   // Add skill
//   const addSkill = async (e) => {
//     e.preventDefault();
//     if (!selectedUser) return alert("Select a user first!");
//     try {
//       await axios.post(`${API_BASE}/users/${selectedUser}/skills`, skillForm);
//       setSkillForm({ name: "", category: "", difficulty: 1 });
//       loadSkills(selectedUser);
//     } catch (err) {
//       console.error("Error adding skill", err);
//     }
//   };

//   // --- Learning Goals (Frontend only for now) ---
//   const addGoal = (e) => {
//     e.preventDefault();
//     setGoals([...goals, { ...goalForm, id: Date.now() }]);
//     setGoalForm({
//       skill: "",
//       resource: "video",
//       platform: "YouTube",
//       status: "started",
//       hours: 0,
//       notes: "",
//       difficulty: 1,
//     });
//   };

//   const updateGoalStatus = (id, status) => {
//     setGoals(goals.map((g) => (g.id === id ? { ...g, status } : g)));
//   };

//   const progressPercent = (status) => {
//     if (status === "started") return 20;
//     if (status === "in-progress") return 60;
//     if (status === "completed") return 100;
//     return 0;
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>🚀 SkillStack Dashboard</h1>

//       {/* ================= USERS ================= */}
//       <h2>👥 Users</h2>
//       <form onSubmit={addUser}>
//         <input
//           placeholder="Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <button type="submit" className="btn-green">Add User</button>
//       </form>

//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>
//             {u.name} ({u.email}) — Skills: {u.skills.length}{" "}
//             <button className="btn-green" onClick={() => loadSkills(u.id)}>View Skills</button>
//           </li>
//         ))}
//       </ul>

//       {/* ================= SKILLS ================= */}
//       {selectedUser && (
//         <>
//           <h2>📌 Skills for User {selectedUser}</h2>
//           <form onSubmit={addSkill}>
//             <input
//               placeholder="Skill name"
//               value={skillForm.name}
//               onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
//             />
//             <input
//               placeholder="Category"
//               value={skillForm.category}
//               onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
//             />
//             <input
//               type="number"
//               min="1"
//               max="5"
//               placeholder="Difficulty"
//               value={skillForm.difficulty}
//               onChange={(e) =>
//                 setSkillForm({ ...skillForm, difficulty: parseInt(e.target.value) })
//               }
//             />
//             <button type="submit" className="btn-green">Add Skill</button>
//           </form>

//           <ul>
//             {skills.map((s) => (
//               <li key={s.id}>
//                 {s.name} ({s.category}) [Difficulty {s.difficulty}]
//               </li>
//             ))}
//           </ul>
//         </>
//       )}

//       {/* ================= LEARNING GOALS ================= */}
//       <h2>🎯 Learning Goals</h2>
//       <form onSubmit={addGoal}>
//         <input
//           placeholder="Skill"
//           value={goalForm.skill}
//           onChange={(e) => setGoalForm({ ...goalForm, skill: e.target.value })}
//         />
//         <select
//           value={goalForm.resource}
//           onChange={(e) => setGoalForm({ ...goalForm, resource: e.target.value })}
//         >
//           <option value="video">Video</option>
//           <option value="course">Course</option>
//           <option value="article">Article</option>
//         </select>
//         <select
//           value={goalForm.platform}
//           onChange={(e) => setGoalForm({ ...goalForm, platform: e.target.value })}
//         >
//           <option value="YouTube">YouTube</option>
//           <option value="Udemy">Udemy</option>
//           <option value="Coursera">Coursera</option>
//           <option value="Other">Other</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Hours"
//           value={goalForm.hours}
//           onChange={(e) => setGoalForm({ ...goalForm, hours: parseInt(e.target.value) })}
//         />
//         <textarea
//           placeholder="Notes"
//           value={goalForm.notes}
//           onChange={(e) => setGoalForm({ ...goalForm, notes: e.target.value })}
//         />
//         <input
//           type="number"
//           min="1"
//           max="5"
//           placeholder="Difficulty"
//           value={goalForm.difficulty}
//           onChange={(e) =>
//             setGoalForm({ ...goalForm, difficulty: parseInt(e.target.value) })
//           }
//         />
//         <button type="submit" className="btn-green">Add Goal</button>
//       </form>

//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {goals.map((g) => (
//           <li key={g.id} style={{ marginBottom: "20px" }}>
//             <strong>{g.skill}</strong> ({g.resource} on {g.platform})<br />
//             Status: {g.status} | Hours: {g.hours} | Difficulty: {g.difficulty}
//             <p>{g.notes}</p>

//             {/* progress bar */}
//             {/* <div style={{ background: "#eee", borderRadius: "6px", overflow: "hidden" }}>
//               <div
//                 style={{
//                   width: `${progressPercent(g.status)}%`,
//                   backgroundColor: `hsl(${progressPercent(g.status)}, 100%, 40%)`,
//                   color: "white",
//                   textAlign: "center",
//                   padding: "4px 0",
//                 }}
//               >
//                 {progressPercent(g.status)}%
//               </div>
//             </div> */}

//             <div className="progress-container">
//         <div className="progress-bar"
//     style={{
//       width: `${progressPercent}%`,
//       backgroundColor: `hsl(${progressPercent}, 100%, 40%)`,
//     }}
//   >
//     {progressPercent}%
//   </div>
// </div>


//             {/* status update buttons */}
//             <div style={{ marginTop: "8px" }}>
//               <button className="btn-green" onClick={() => updateGoalStatus(g.id, "started")}>Started</button>
//               <button className="btn-green" onClick={() => updateGoalStatus(g.id, "in-progress")}>In Progress</button>
//               <button className="btn-green" onClick={() => updateGoalStatus(g.id, "completed")}>Completed</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  // ---- USERS ----
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);

  // ---- SKILLS ----
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: "", category: "", difficulty: 1 });
  const [selectedSkill, setSelectedSkill] = useState(null);

  // ---- RESOURCES ----
  const [resources, setResources] = useState([]);
  const [resourceForm, setResourceForm] = useState({ type: "video", platform: "YouTube", link: "" });

  // ---- PROGRESS ----
  const [progress, setProgress] = useState([]);
  const [progressForm, setProgressForm] = useState({ status: "started", hours: 0, notes: "" });

  // Load users
  const loadUsers = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    setUsers(res.data);
  };

  // Create user
  const createUser = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/users`, userForm);
    setUserForm({ name: "", email: "" });
    loadUsers();
  };

  // Load skills for selected user
  const loadSkills = async (userId) => {
    setSelectedUser(userId);
    setSelectedSkill(null);
    const res = await axios.get(`${API_BASE}/users/${userId}/skills`);
    setSkills(res.data);
    setResources([]);
    setProgress([]);
  };

  // Add skill
  const addSkill = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/users/${selectedUser}/skills`, skillForm);
    setSkillForm({ name: "", category: "", difficulty: 1 });
    loadSkills(selectedUser);
  };

  // Load resources for a skill
  const loadResources = async (skillId) => {
    setSelectedSkill(skillId);
    const res = await axios.get(`${API_BASE}/skills/${skillId}/progress`); // preload progress
    setProgress(res.data);
    setResources([]); // if you had GET /skills/{id}/resources, fetch here
  };

  // Add resource
  const addResource = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/skills/${selectedSkill}/resources`, resourceForm);
    setResourceForm({ type: "video", platform: "YouTube", link: "" });
    alert("Resource added ✅");
  };

  // Add progress
  const addProgress = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/skills/${selectedSkill}/progress`, progressForm);
    setProgressForm({ status: "started", hours: 0, notes: "" });
    const res = await axios.get(`${API_BASE}/skills/${selectedSkill}/progress`);
    setProgress(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Simple helper for progress %
  const statusToPercent = (status) => {
    if (status === "started") return 20;
    if (status === "in-progress") return 60;
    if (status === "completed") return 100;
    return 0;
  };

  // calculate percent of completion
const calcPercent = (spent, total) => {
  if (!total || total === 0) return 0;
  return Math.min(Math.round((spent / total) * 100), 100);
};


  return (
    <div className="App">
      <h1>🚀 SkillStack Dashboard</h1>

      {/* USERS */}
      <h2>👤 Users</h2>
      <form onSubmit={createUser}>
        <input
          placeholder="Name"
          value={userForm.name}
          onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={userForm.email}
          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
        />
        <button type="submit" className="btn-green">Add User</button>
      </form>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
            <button className="btn-green" onClick={() => loadSkills(u.id)}>View Skills</button>
          </li>
        ))}
      </ul>

      {/* SKILLS */}
      {selectedUser && (
        <>
          <h2>💡 Skills for User {selectedUser}</h2>
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
            <input
              type="number"
              min="1"
              placeholder="Total Hours Required"
              value={skillForm.total_hours || ""}
              onChange={(e) =>
                setSkillForm({ ...skillForm, total_hours: parseInt(e.target.value) })
    }
  />
            <button type="submit" className="btn-green">Add Skill</button>
          </form>
          <ul>
            {skills.map((s) => (
              <li key={s.id}>
                {s.name} ({s.category}) [Difficulty {s.difficulty}]
                <button className="btn-green" onClick={() => loadResources(s.id)}>
                  Manage
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* RESOURCES + PROGRESS */}
      {selectedSkill && (
        <>
          <h2>📚 Resources for Skill {selectedSkill}</h2>
          <form onSubmit={addResource}>
            <select
              value={resourceForm.type}
              onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}
            >
              <option value="video">Video</option>
              <option value="course">Course</option>
              <option value="article">Article</option>
            </select>
            <select
              value={resourceForm.platform}
              onChange={(e) => setResourceForm({ ...resourceForm, platform: e.target.value })}
            >
              <option value="YouTube">YouTube</option>
              <option value="Udemy">Udemy</option>
              <option value="Coursera">Coursera</option>
              <option value="Other">Other</option>
            </select>
            <input
              placeholder="Link"
              value={resourceForm.link}
              onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value })}
            />
            <button type="submit" className="btn-green">Add Resource</button>
          </form>

          <h2>📈 Progress</h2>
          <form onSubmit={addProgress}>
            <select
              value={progressForm.status}
              onChange={(e) => setProgressForm({ ...progressForm, status: e.target.value })}
            >
              <option value="started">Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="number"
              placeholder="Hours spent"
              value={progressForm.hours}
              onChange={(e) => setProgressForm({ ...progressForm, hours: parseInt(e.target.value) })}
            />
            <input
              placeholder="Notes"
              value={progressForm.notes}
              onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
            />
            <button type="submit" className="btn-green">Add Progress</button>
          </form>

          <ul>
  {progress.map((p) => {
    const currentSkill = skills.find((s) => s.id === selectedSkill);
    const percent = currentSkill ? calcPercent(p.hours, currentSkill.total_hours) : 0;

    return (
      <li key={p.id}>
        Status: {p.status} | Hours Spent: {p.hours} /{" "}
        {currentSkill?.total_hours || "?"} | Notes: {p.notes}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${percent}%`,
              backgroundColor: `hsl(${percent}, 100%, 40%)`,
            }}
          >
            {percent}%
          </div>
        </div>
      </li>
    );
  })}
</ul>

        </>
      )}
    </div>
  );
}

export default App;


