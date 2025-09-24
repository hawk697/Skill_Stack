import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ value }) {
  const percent = Math.min(Math.max(value, 0), 100); // clamp 0-100
  const color = `hsl(${percent}, 100%, 40%)`; // red (0) → green (100)

  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{ width: `${percent}%`, backgroundColor: color }}
      >
        {percent}%
      </div>
    </div>
  );
}
