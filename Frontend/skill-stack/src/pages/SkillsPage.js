import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addSkill, getSkills, deleteSkill } from "../api";

export default function SkillsPage() {
  const { userId } = useParams();
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", difficulty: 1 });

  const loadSkills = async () => {
    const res = await getSkills(userId);
    setSkills(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSkill(userId, form);
    setForm({ name: "", category: "", difficulty: 1 });
    loadSkills();
  };

  const handleDelete = async (id) => {
    await deleteSkill(id);
    loadSkills();
  };

  useEffect(() => {
    loadSkills();
  }, [userId]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Skills for User {userId}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Skill name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Difficulty"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: parseInt(e.target.value) })}
        />
        <button type="submit">Add Skill</button>
      </form>

      <ul>
        {skills.map((s) => (
          <li key={s.id}>
            {s.name} ({s.category}) [Difficulty {s.difficulty}] 
            <button onClick={() => handleDelete(s.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
