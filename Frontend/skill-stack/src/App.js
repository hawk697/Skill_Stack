
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  // ---- USERS ----
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState("");

  // ---- SKILLS ----
  const [skills, setSkills] = useState([]);
  const [skillForm, setSkillForm] = useState({ name: "", category: "", total_hours: 0 }); // Removed difficulty from form based on design
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedSkillName, setSelectedSkillName] = useState("");

  // ---- RESOURCES ----
  const [resources, setResources] = useState([]);
  const [resourceForm, setResourceForm] = useState({ type: "video", platform: "YouTube", link: "", title: "" });

  // ---- PROGRESS ----
  const [progress, setProgress] = useState([]);
  const [progressForm, setProgressForm] = useState({ status: "in-progress", hours: 0, notes: "" });
  const [totalHoursSpent, setTotalHoursSpent] = useState(0);
  const [totalHoursRequired, setTotalHoursRequired] = useState(0);


  // Load users
  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Create user
  const createUser = async (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      alert("Name and Email are required to add a user.");
      return;
    }
    try {
      await axios.post(`${API_BASE}/users`, userForm);
      setUserForm({ name: "", email: "" });
      loadUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to add user. See console for details.");
    }
  };

  // Load skills for selected user
  const loadSkills = async (userId, userName) => {
    setSelectedUser(userId);
    setSelectedUserName(userName);
    setSelectedSkill(null); // Reset selected skill when user changes
    setSelectedSkillName("");
    setResources([]);
    setProgress([]);
    setTotalHoursSpent(0);
    setTotalHoursRequired(0);

    try {
      const res = await axios.get(`${API_BASE}/users/${userId}/skills`);
      setSkills(res.data);
    } catch (error) {
      console.error(`Error loading skills for user ${userId}:`, error);
      setSkills([]); // Clear skills on error
    }
  };

  // Add skill
  const addSkill = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Please select a user first.");
      return;
    }
    if (!skillForm.name || !skillForm.category || !skillForm.total_hours) {
      alert("Skill Name, Category, and Total Hours are required.");
      return;
    }
    try {
      // Assuming difficulty is not needed in the add skill form based on design
      // If needed, add it back to skillForm state and the JSX
      await axios.post(`${API_BASE}/users/${selectedUser}/skills`, {
        ...skillForm,
        difficulty: 1 // Defaulting difficulty if not in form
      });
      setSkillForm({ name: "", category: "", total_hours: 0 });
      loadSkills(selectedUser, selectedUserName); // Reload skills for current user
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill. See console for details.");
    }
  };

  // Load resources and progress for a skill
  const loadSkillDetails = async (skillId, skillName) => {
    setSelectedSkill(skillId);
    setSelectedSkillName(skillName);
    setResources([]); // Clear resources
    setProgress([]); // Clear progress
    setTotalHoursSpent(0);
    setTotalHoursRequired(0);

    try {
      // Fetch Progress
      const progressRes = await axios.get(`${API_BASE}/skills/${skillId}/progress`);
      setProgress(progressRes.data);

      // Calculate total hours spent
      const spent = progressRes.data.reduce((sum, p) => sum + (p.hours || 0), 0);
      setTotalHoursSpent(spent);

      // Get skill details to find total_hours_required
      const skillRes = skills.find(s => s.id === skillId);
      if (skillRes) {
          setTotalHoursRequired(skillRes.total_hours || 0);
      } else {
          // Fallback if skill not found in current skills state (shouldn't happen if skills loaded correctly)
          const singleSkillRes = await axios.get(`${API_BASE}/skills/${skillId}`); // You might need this endpoint
          setTotalHoursRequired(singleSkillRes.data.total_hours || 0);
      }

      // TODO: Fetch Resources for the selected skill
      // This endpoint is not in your current backend setup based on comments.
      // If you implement GET /api/skills/{skill_id}/resources, fetch them here.
      // For now, let's mock some resources or leave empty.
      // const resourcesRes = await axios.get(`${API_BASE}/skills/${skillId}/resources`);
      // setResources(resourcesRes.data);

    } catch (error) {
      console.error(`Error loading details for skill ${skillId}:`, error);
      setProgress([]);
      setResources([]);
      setTotalHoursSpent(0);
      setTotalHoursRequired(0);
      alert("Failed to load skill details. See console for details.");
    }
  };

  // Add resource
  const addResource = async (e) => {
    e.preventDefault();
    if (!selectedSkill) {
      alert("Please select a skill first.");
      return;
    }
    if (!resourceForm.link || !resourceForm.title) {
        alert("Link and Title are required for a resource.");
        return;
    }
    try {
      await axios.post(`${API_BASE}/skills/${selectedSkill}/resources`, resourceForm);
      setResourceForm({ type: "video", platform: "YouTube", link: "", title: "" });
      alert("Resource added successfully! (Note: Resources don't auto-reload yet as backend endpoint is missing)");
      // If you implement GET /api/skills/{skill_id}/resources, call loadSkillDetails(selectedSkill, selectedSkillName) here.
    } catch (error) {
      console.error("Error adding resource:", error);
      alert("Failed to add resource. See console for details.");
    }
  };

  // Add progress
  // Add progress
const addProgress = async (e) => {
  e.preventDefault();
  if (!selectedSkill) {
    alert("Please select a skill first.");
    return;
  }
  if (progressForm.hours <= 0) {
    alert("Hours spent must be greater than 0.");
    return;
  }
  try {
    await axios.post(`${API_BASE}/skills/${selectedSkill}/progress`, progressForm);
    setProgressForm({ status: "in-progress", hours: 0, notes: "" });
    
    // reload updated progress and totals
    await loadSkillDetails(selectedSkill, selectedSkillName);

    // After reload, check if completed
    const spent = progress.reduce((sum, p) => sum + (p.hours || 0), 0);
    if (progressForm.status === "completed" || spent >= totalHoursRequired) {
      alert(`🎉 Skill "${selectedSkillName}" has been completed!`);
    }
  } catch (error) {
    console.error("Error adding progress:", error);
    alert("Failed to add progress. See console for details.");
  }
};


  // Initial load of users
  useEffect(() => {
    loadUsers();
  }, []);

  // Calculate percentage of completion
  const calcPercent = (spent, total) => {
    if (!total || total === 0) return 0;
    return Math.min(Math.round((spent / total) * 100), 100);
  };

  const currentProgressPercent = calcPercent(totalHoursSpent, totalHoursRequired);

  return (
    <div className="App">
      <header className="dashboard-header">
        <h1>🚀 SkillStack Dashboard</h1>
      </header>

      <div className="main-grid-container">

        {/* USERS CARD */}
        <div className="card users-card">
          <h3>👤 Users</h3>
          <form onSubmit={createUser} className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">Add User</button>
          </form>

          <div className="user-list">
            {users.map((u) => (
              <div
                key={u.id}
                className={`user-item ${selectedUser === u.id ? 'selected' : ''}`}
                onClick={() => loadSkills(u.id, u.name)}
              >
                <span>{u.name}</span>
                <span className="user-email">{u.email}</span>
                <button className="btn btn-secondary btn-small" onClick={(e) => {
                    e.stopPropagation(); // Prevent loadSkills from firing again
                    loadSkills(u.id, u.name);
                }}>View Skills</button>
              </div>
            ))}
          </div>
        </div> {/* End Users Card */}

        {/* SKILLS FOR USER CARD (conditionally rendered) */}
        {selectedUser && (
          <div className="card skills-for-user-card">
            <h3>💡 Skills for {selectedUserName}</h3>
            <form onSubmit={addSkill} className="form-group">
              <input
                type="text"
                placeholder="Skill name"
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Category"
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
              />
              <div className="input-with-label">
                <label>Total Hrs:</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Required Hours"
                  value={skillForm.total_hours}
                  onChange={(e) => setSkillForm({ ...skillForm, total_hours: parseInt(e.target.value) || 0 })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Add Skill</button>
            </form>

            <div className="skill-list-table">
              {skills.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Skill</th>
                      <th>Category</th>
                      <th>Hrs Req</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((s) => (
                      <tr key={s.id} className={selectedSkill === s.id ? 'selected' : ''}>
                        <td>{s.name}</td>
                        <td>{s.category}</td>
                        <td>{s.total_hours}</td>
                        <td>
                          <button className="btn btn-secondary btn-small" onClick={() => loadSkillDetails(s.id, s.name)}>
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No skills added for this user yet.</p>
              )}
            </div>
          </div>
        )} {/* End Skills for User Card */}

        {/* RESOURCES FOR SKILL CARD (conditionally rendered) */}
        {selectedSkill && (
          <div className="card resources-card">
            <h3>📚 Resources for {selectedSkillName}</h3>
            <form onSubmit={addResource} className="form-group stacked">
                <input
                    type="text"
                    placeholder="Resource Title (e.g., Intro to AI Course)"
                    value={resourceForm.title}
                    onChange={(e) => setResourceForm({ ...resourceForm, title: e.target.value })}
                />
              <select
                value={resourceForm.type}
                onChange={(e) => setResourceForm({ ...resourceForm, type: e.target.value })}
              >
                <option value="video">Video</option>
                <option value="course">Course</option>
                <option value="article">Article</option>
                <option value="book">Book</option>
                <option value="other">Other</option>
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
                type="url"
                placeholder="Link to resource (e.g., https://youtube.com/...)"
                value={resourceForm.link}
                onChange={(e) => setResourceForm({ ...resourceForm, link: e.target.value })}
              />
              <button type="submit" className="btn btn-primary">Add Resource</button>
            </form>

            <div className="resource-list">
                {/* Dummy resources as backend GET is not implemented yet */}
                {resources.length === 0 ? (
                    <div>
                        <p>No resources added yet. (Backend GET endpoint for resources is missing)</p>
                        <div className="resource-item">
                            <span className="icon">▶</span>
                            <span>YouTube: Introduction to React Hooks</span>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="btn-icon">🔗</a>
                        </div>
                        <div className="resource-item">
                            <span className="icon">📄</span>
                            <span>Article: Advanced CSS Grid Techniques</span>
                            <a href="#" target="_blank" rel="noopener noreferrer" className="btn-icon">🔗</a>
                        </div>
                    </div>
                ) : (
                    resources.map(r => (
                        <div key={r.id} className="resource-item">
                            <span className="icon">
                                {r.type === 'video' && '▶'}
                                {r.type === 'article' && '📄'}
                                {r.type === 'book' && '📚'}
                                {r.type === 'course' && '🎓'}
                                {r.type === 'other' && '🔗'}
                            </span>
                            <span>{r.platform}: {r.title || r.link}</span>
                            <a href={r.link} target="_blank" rel="noopener noreferrer" className="btn-icon">🔗</a>
                        </div>
                    ))
                )}
            </div>
          </div>
        )} {/* End Resources Card */}

        {/* PROGRESS CARD (conditionally rendered) */}
        {selectedSkill && (
          <div className="card progress-card">
            <h3>📈 Progress for {selectedSkillName}</h3>

            <div className="progress-summary">
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${currentProgressPercent}%` }}
                ></div>
                <span className="progress-text">{currentProgressPercent}% Complete</span>
              </div>
              <p className="hours-summary">
                <strong>{totalHoursSpent}</strong> / {totalHoursRequired} Hours Spent
              </p>
            </div>

            <form onSubmit={addProgress} className="form-group stacked">
              <div className="input-group">
                <label htmlFor="progress-status">Status:</label>
                <select
                  id="progress-status"
                  value={progressForm.status}
                  onChange={(e) => setProgressForm({ ...progressForm, status: e.target.value })}
                >
                  <option value="started">Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="progress-hours">Hours Spent:</label>
                <input
                  id="progress-hours"
                  type="number"
                  min="0"
                  placeholder="Hours spent"
                  value={progressForm.hours}
                  onChange={(e) => setProgressForm({ ...progressForm, hours: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="input-group">
                <label htmlFor="progress-notes">Notes:</label>
                <input
                  id="progress-notes"
                  type="text"
                  placeholder="Add notes..."
                  value={progressForm.notes}
                  onChange={(e) => setProgressForm({ ...progressForm, notes: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary">Log Progress</button>
            </form>

            <div className="progress-history">
              <h4>Progress Log:</h4>
              {progress.length > 0 ? (
                <ul>
                  {progress.map((p) => (
                    <li key={p.id} className="progress-item">
                      <span className={`progress-status-badge ${p.status}`}>
                          {p.status === 'started' && '▶ Started'}
                          {p.status === 'in-progress' && '⏳ In Progress'}
                          {p.status === 'completed' && '✅ Completed'}
                      </span>
                      <span>{p.hours} hrs</span>
                      {p.notes && <span className="progress-note">{p.notes}</span>}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No progress logged yet.</p>
              )}
            </div>
          </div>
        )} {/* End Progress Card */}

      </div> {/* End main-grid-container */}
    </div>
  );
}

export default App;