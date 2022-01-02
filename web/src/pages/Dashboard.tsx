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
import Dashboard from "../components/general/Dashboard";
export default function () {
  const [user, setUser] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");

    if (temp === undefined || temp === null) {
      nav("/login");
    }
    setUser(temp);
  }, [user]);

  var temp = window.localStorage.getItem("User");
  return (
    <>
      <div className="sticky top-0">
        <NavBar />
      </div>
      <Dashboard />
    </>
  );
}
