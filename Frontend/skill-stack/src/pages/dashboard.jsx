import { useEffect, useState } from "react";
import api from "../api";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = Object.entries(data.by_resource).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Skills: {data.total_skills}</p>
      <p>Completed: {data.completed}</p>
      <p>Total Hours: {data.total_hours}</p>

      <PieChart width={300} height={200}>
        <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={80}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={["#8884d8", "#82ca9d", "#ffc658"][index % 3]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}
