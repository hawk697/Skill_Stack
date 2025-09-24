import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddSkill from "./pages/AddSkill";
import SkillsList from "./pages/SkillsList";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/skills">Skills</Link> |{" "}
        <Link to="/add">Add Skill</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/skills" element={<SkillsList />} />
        <Route path="/add" element={<AddSkill />} />
      </Routes>
    </BrowserRouter>
  );
}
