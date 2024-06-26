import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-zinc-900 text-white p-4 md:w-1/4 w-full">
      <nav className="space-y-4">
        <NavLink
          to="/react-flow"
          className={({ isActive }) =>
            isActive
              ? "block p-2 bg-zinc-800 rounded"
              : "block p-2 hover:bg-zinc-700 rounded"
          }
        >
          React Flow
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive
              ? "block p-2 bg-zinc-800 rounded"
              : "block p-2 hover:bg-zinc-700 rounded"
          }
        >
          Search
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
