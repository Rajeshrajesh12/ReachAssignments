import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./index.css";
export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-grow p-4 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
