import { useState } from "react";
import api from "../api";

export default function AddSkill() {
  const [form, setForm] = useState({
    name: "",
    resource_type: "course",
    platform: "",
    difficulty: 3,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/skills", form);
    alert("Skill added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Skill name" onChange={handleChange} />
      <select name="resource_type" onChange={handleChange}>
        <option value="course">Course</option>
        <option value="video">Video</option>
        <option value="article">Article</option>
      </select>
      <input name="platform" placeholder="Platform" onChange={handleChange} />
      <input name="difficulty" type="number" min="1" max="5" onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
}
