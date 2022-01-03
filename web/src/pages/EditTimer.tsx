import EditTimer from "../components/timer/EditTimer";
import NavBar from "../components/general/NavBar";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
export default function EditTimerPage() {
  const [user, setUser] = useState<string | null>(null);
  const nav = useNavigate();
  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");

    // Redirects if user is not logged in
    if (temp === null || temp === undefined) {
      nav("/login");
    }
  }, [user]);
  return (
    <div className="w-screen h-full lg:h-screen lg:overflow-hidden">
      <div className="sticky top-0">
        <NavBar />
      </div>
      <div className="overflow-auto overflow-hidden">
        <EditTimer />
      </div>
    </div>
  );
}
