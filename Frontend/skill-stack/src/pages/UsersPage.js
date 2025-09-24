import React, { useState, useEffect } from "react";
import { createUser, getUsers } from "../api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(form);
    setForm({ name: "", email: "" });
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>
      <form onSubmit={handleSubmit}>
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
            {u.name} ({u.email}) → Skills: {u.skills.length}
          </li>
        ))}
      </ul>
    </div>
  );
}
