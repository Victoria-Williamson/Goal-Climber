import Home from "../components/general/Home";
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
export default function HomePage() {
  const nav = useNavigate();
  useEffect(() => {
    // storing input name
    var temp = window.localStorage.getItem("uid");

    if (temp !== undefined && temp !== null) {
      nav("/dashboard");
    }
  });
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="sticky top-0">
        <NavBar />
      </div>
      <Home />
    </div>
  );
}
