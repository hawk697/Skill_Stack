import { useEffect, useState } from "react";
import api from "../api";

export default function SkillsList() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get("/skills").then((res) => setSkills(res.data));
  }, []);

  return (
    <ul>
      {skills.map((s) => (
        <li key={s.id}>
          {s.name} - {s.status} ({s.total_hours} hrs)
        </li>
      ))}
    </ul>
  );
}
